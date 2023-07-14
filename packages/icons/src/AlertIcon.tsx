// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type AlertIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const AlertIcon: React.FC<AlertIconProps> = ({
  width = "52",
  height = "48",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 52 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...restProps}
    >
      <rect width="52" height="48" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_572_960"
            transform="scale(0.0192308 0.0208333)"
          />
        </pattern>
        <image
          id="image0_572_960"
          width="52"
          height="48"
          // eslint-disable-next-line no-secrets/no-secrets
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAwCAYAAABe6Vn9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARXSURBVGhD7ZnPTxNBFMe/25aC5VcpQsQfSOJJDl5NOBlPeDUkaowkaqIXDyZGE0m8efKGGiPKjRCI0aMHDqhH/wEkMZpIMPyIpRSoSH/Qdd7rFFB2d2aWUqHxk0zafTvbfd/uzJv3Zi1bgAoiID8rhv+C9jr/Be11Shvl0mludiYD5HLA+jqQzxfOBcR/FwwCoRCscBiori60ErNzQcJxO5UCVlcLAkwggZEIrLo6FloK/AsSztvLywCJKQVClNXQUBC5A/wJ+vkTdjK5OZxKhRiWVjQK1NZKgznGguzFxdI9FTfoaTU1yQMzjATZ8Tjw65c82mUOHIB18KA80Ec7bJdVDCHuxfc0REsQD7NyiilCoujeBqgFiQCw63PGC7o3+aCJtyAKzRTNfGKvrSH1/j03mxZdn7APmmucZ1DYSUTLTk9j5s4drCcSfBxqaUHbo0eoOnaMj43RjHzuT4hSF59ibHHt7P37CIjU5ujgII4ODPCCOdfXx+d8Qb5oXOsqiNMZnyy9fo3c3Bxa7t5FuKMD4RMn0HrvHrKzs1h680b2MkfHJ/cnRLmZD9aXlrA4NITari7UnDolreDvEWFLDg9zH19o+OQsiCawaaIpSbx4wdc237olLZs037zJmXji5UtpMYR8UgQXd0E+yHz9ipWxMTT29CDU2iqtm1QdOYKG8+e5D/X1hR9BXM/4IN7fj6CIRNHLl6UFWH77lluRpitXEGxsRPzxY2kxQ+Wb8xPyEYlS795h7dMnxK5fR0DkYUVS4+PcitC52LVrWJuYQOrDB2k1QOGbsyDD+UOL5sLz5xzN6ru7pdWd+nPnuO/Cs2ews1lp1UThm7MgwzonOTLCC2jL7dvSosCyuC9dkxwdlUZNFL45CzIg9+MHkq9eoe7sWVSfPCmtm1hiQaX2N9S37swZFlTMJkqBsyDa0NAkQVmA+NdiN25Iy580Xb3KzYmYCOM0hBboN3RR+OZ8VrOuT09O8sSmqBZyKcZqOju5OUH5XfTiRQ4a9FtaKHxzFqS5A0Nhmp26cEFathN/+pSbG9FLlxCMxRB/8kRaFCh8cxTE+2YKMt++If3lCw8nr/40t6i5YYkElsJ4+vNnztBVqHxzfkIaG4C5+Xn+DLe386cbXkOuSJX8jeJveqLwzbUesmdmPGN+XpTHUyLFCYv6Jtrbi4DPraf8ygons9nv39EhMnGrpkaecYAi5uHD8sAZd0FUJYqbebH68SPmHjwQnY12wrYj1qVDDx8icvq0NLhQX1/Yt/PAvWIVKYYt6hcVeVHvZ6amzFd8SUDMiarjxxGIRKTFHautTRkUdq0ELzk7LsEFvNdssMjuGrRFTL5o4O0tTULFmC0H7IPmYq/++yl60euOfwXd2yCCao0nHrtbapyyQfvbhpv22hOEN87LKYrE+Nis94xyTlTU65QNKumF1wYiLaqcV5JboYyCRO37l8ZO0J6ZaPv7tf4eQzts7w+A301u9BsjpsBjAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};
