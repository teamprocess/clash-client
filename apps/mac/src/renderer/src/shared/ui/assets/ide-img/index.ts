import styled, { css } from "styled-components";
import VSCode from "./ide-vscode.svg";
import InteliJ from "./ide-intellij-idea.svg";
import WebStorm from "./ide-webstorm.svg";
import PyCharm from "./ide-pycharm.svg";
import GOLand from "./ide-goland.svg";
import PhpStorm from "./ide-phpstorm.svg";
import RubyMine from "./ide-rubymine.svg";
import Clion from "./ide-clion.svg";
import Rider from "./ide-rider.svg";
import Xcode from "./ide-xcode.svg";
import AndroidStudio from "./ide-android-studio.svg";
import Unity from "./unity.svg";

const ideIconStyle = css`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
`;

export const IdeIcons = {
  INTELLIJ_IDEA: styled(InteliJ)`
    ${ideIconStyle}
  `,
  WEBSTORM: styled(WebStorm)`
    ${ideIconStyle}
  `,
  VSCODE: styled(VSCode)`
    ${ideIconStyle}
  `,
  PYCHARM: styled(PyCharm)`
    ${ideIconStyle}
  `,
  GOLAND: styled(GOLand)`
    ${ideIconStyle}
  `,
  PHPSTORM: styled(PhpStorm)`
    ${ideIconStyle}
  `,
  RUBYMINE: styled(RubyMine)`
    ${ideIconStyle}
  `,
  CLION: styled(Clion)`
    ${ideIconStyle}
  `,
  RIDER: styled(Rider)`
    ${ideIconStyle}
  `,
  XCODE: styled(Xcode)`
    ${ideIconStyle}
  `,
  ANDROID_STUDIO: styled(AndroidStudio)`
    ${ideIconStyle}
  `,
  UNITY: styled(Unity)`
    ${ideIconStyle}
  `,
} as const;
