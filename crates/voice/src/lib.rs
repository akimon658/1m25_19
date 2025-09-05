use std::path::PathBuf;

use anyhow::{Context, Result};
use voicevox_core::blocking::{Onnxruntime, OpenJtalk, Synthesizer, VoiceModelFile};

const VVORT: &str =
    const_format::concatcp!("./onnxruntime/lib/", Onnxruntime::LIB_VERSIONED_FILENAME,);
const OJT_DIC: &str = "./dict/open_jtalk_dic_utf_8-1.11";
const VVM: &str = "./models/vvms/13.vvm";
const TARGET_CHARACTER_NAME: &str = "猫使ビィ";
const TARGET_STYLE_NAME: &str = "ノーマル";

pub async fn synth(vvcore_dir: &PathBuf, text: &str) -> Result<Vec<u8>> {
    let synthesizer = {
        let ort = Onnxruntime::load_once()
            .filename(
                vvcore_dir
                    .join(VVORT)
                    .to_str()
                    .context("invalid onnxruntime path")?,
            )
            .perform()?;
        let ojt = OpenJtalk::new(
            vvcore_dir
                .join(OJT_DIC)
                .to_str()
                .context("invalid open_jtalk_dic path")?,
        )?;

        Synthesizer::builder(ort).text_analyzer(ojt).build()?
    };

    synthesizer.load_voice_model(&VoiceModelFile::open(
        vvcore_dir
            .join(VVM)
            .to_str()
            .context("invalid voice model path")?,
    )?)?;

    let style_id = synthesizer
        .metas()
        .into_iter()
        .filter(|character| character.name == TARGET_CHARACTER_NAME)
        .flat_map(|character| character.styles)
        .find(|style| style.name == TARGET_STYLE_NAME)
        .with_context(|| {
            format!("could not find \"{TARGET_CHARACTER_NAME} ({TARGET_STYLE_NAME})\"")
        })?
        .id;
    let wav = synthesizer.tts(text, style_id).perform()?;

    Ok(wav)
}
