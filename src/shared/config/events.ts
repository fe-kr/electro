export const enum RendererToMainEvent {
  GET_STATIC_DATA = "GET_STATIC_DATA",
  GET_DYNAMIC_DATA = "GET_DYNAMIC_DATA",
  SEND_FRAME_STATUS = "SEND_FRAME_STATUS",
}

export const enum FrameStatus {
  CLOSE = "CLOSE",
  MINIMIZE = "MINIMIZE",
  MAXIMIZE = "MAXIMIZE",
}
