export function getVideoInformations(videoImportName) {
  const videoName = videoImportName.split("/").pop().split(".")[0];
  const [text, index, jndex] = videoName.split("_");
  return [text, index, jndex];
}
