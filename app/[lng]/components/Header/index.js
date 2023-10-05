import { useTranslation } from "../../../i18n";

import { HeaderBase } from "./HeaderBase";

export const Header = async ({ lng, url }) => {
  const { t } = await useTranslation(lng, "header");
  return <HeaderBase t={t} lng={lng} url={url} />;
};
