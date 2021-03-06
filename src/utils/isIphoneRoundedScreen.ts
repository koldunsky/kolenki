import { screenRatio } from './screenRatio'
import { isIos } from '@/utils/isIos'

function isIphoneRoundedScreenCheck (): boolean {
  return isIos && (screenRatio > 2)
}

export const isIphoneRoundedScreen = isIphoneRoundedScreenCheck()
