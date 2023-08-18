import { h } from "preact";

type FooterLink = {
  name: string;
  linkTarget: string;
}

const DEFAULT_LINKS: FooterLink[] = [
  {
    name: "About GoSaaS",
    linkTarget: "https://www.gosaas.io/",
  },
  {
    name: "Contact Us",
    linkTarget: "https://www.gosaas.io/contact-us",
  }
];

const copyRightString = "© 2023 GoSaaS, Inc.";

export const Footer = () => {
  return (
    <footer class="oj-web-applayout-footer oj-applayout-fixed-bottom" role="contentinfo">
      <div class="oj-flex oj-sm-flex-direction-row oj-sm-align-items-center">
        <div class="oj-md-4">
          <ul>
            {DEFAULT_LINKS.map((item) => (
              <li>
                <a href={item.linkTarget} target="_blank">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="oj-md-4">
          <div class="oj-flex oj-flex-item oj-sm-justify-content-center oj-text-color-secondary oj-typography-body-sm">
            {copyRightString}
          </div>
        </div>
        <div class="oj-md-4 oj-flex oj-sm-justify-content-flex-end">
          <span class="gosaas-icon"></span>
        </div>
      </div>
    </footer>
  );
}
