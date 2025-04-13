export const enum RendererToMainEvent {
  GET_RESOURCES_LIMITS = "GET_RESOURCES_LIMITS",
  GET_RESOURCES_USAGE = "GET_RESOURCES_USAGE",
  SEND_FRAME_STATUS = "SEND_FRAME_STATUS",
}

export const enum MainToRendererEvent {
  SEND_RESOURCES_USAGE = "SEND_RESOURCES_USAGE",
}

export const enum FrameStatus {
  CLOSE = "CLOSE",
  MINIMIZE = "MINIMIZE",
  MAXIMIZE = "MAXIMIZE",
}
