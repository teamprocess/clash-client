import "styled-components";
import type { Theme } from "@clash/design-tokens/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
