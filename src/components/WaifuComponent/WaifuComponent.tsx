import { useEffect } from 'react'
import { LAppDelegate } from "../../utils/Models2D/lappdelegate";
import * as LAppDefine from '../../utils/Models2D/lappdefine';

export default function WaifuComponent() {

  const initializateModel = () => {

    if (LAppDelegate.getInstance().initialize() == false) {
      return;
    }

    LAppDelegate.getInstance().run();
    window.onbeforeunload = (): void => LAppDelegate.releaseInstance();
    window.onresize = () => {
      if (LAppDefine.CanvasSize === 'auto') {
        LAppDelegate.getInstance().onResize();
      }
    };

  }

  useEffect(() => {
    initializateModel();
  }, []);

  return (
    <div>
      <h1> WaifuComponent </h1>
      <div id="chat-box"> Testing something </div>
      <audio
        id="voice"
        style={{ position: 'absolute', top: '25px', left: '25px' }}
        controls
      />
      <div id=""> Testing </div>
      <canvas
        id="ky-character-area"
        className='w-full'
      > </canvas>
    </div>
  )
}

