import {
  NERVE_DOCS_URL,
  NERVE_DISCORD_URL,
  NERVE_TELEGRAM_URL,
  NERVE_FORUM_URL,
  NERVE_TWITTER_URL,
  NERVE_GITHUB_URL,
} from "../../utils/urls";

import GitHubIcon from "../../components/icons/GitHubIcon";
import TwitterIcon from "../../components/icons/TwitterIcon";
import ForumIcon from "../../components/icons/ForumIcon";
import DiscordIcon from "../../components/icons/DiscordIcon";
import TelegramIcon from "../../components/icons/TelegramIcon";
import DocsIcon from "../../components/icons/DocsIcon";

export default function HomeFooter() {
  return (
    <footer className="">
      <div className="max-w-md mx-auto pb-6 pt-4 px-4 sm:max-w-3xl sm:pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="xl:grid xl:gap-8">
          <div className="space-y-8 text-center ">
            <div className="flex space-x-6 place-content-center">
              <FooterSocialLink
                href={NERVE_TWITTER_URL}
                IconComponent={TwitterIcon}
              />
              <FooterSocialLink
                href={NERVE_DISCORD_URL}
                IconComponent={DiscordIcon}
              />
              <FooterSocialLink
                href={NERVE_TELEGRAM_URL}
                IconComponent={TelegramIcon}
              />
              <FooterSocialLink
                href={NERVE_FORUM_URL}
                IconComponent={ForumIcon}
              />
              <FooterSocialLink
                href={NERVE_DOCS_URL}
                IconComponent={DocsIcon}
              />
              <FooterSocialLink
                href={NERVE_GITHUB_URL}
                IconComponent={GitHubIcon}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-coolGray-200 pt-8 opacity-20"></div>
        <p className="text-base text-coolGray-200 text-center opacity-50">
          Don't get nervous now
        </p>
      </div>
    </footer>
  );
}

function FooterSocialLink({ href, iconSrc, IconComponent }) {
  const imgProps = {
    className:
      "h-6 w-6  text-coolGray-50 opacity-50 hover:opacity-90 transition",
  };

  let iconContent;
  if (iconSrc) {
    iconContent = <img src={iconSrc} {...imgProps} />;
  } else if (IconComponent) {
    iconContent = <IconComponent {...imgProps} />;
  }

  return (
    <a href={href} className="text-warm-gray-400 hover:text-warm-gray-500">
      {iconContent}
    </a>
  );
}
