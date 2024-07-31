import { Fragment } from "react";

export default function SEO({
  title = "",
  description = "",
  keywords = "",
  author = "",
  opengraph = [],
  twitter = [],
}: {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  icon?: string;
  opengraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website";
  }[];
  twitter?: {
    card?: "summary_large_image";
    title?: string;
    description?: string;
    image?: string;
    site?: string;
    creator?: string;
  }[];
}) {
  return (
    <Fragment>
      <head>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {author && <meta name="author" content={author} />}
        {opengraph.map((itme, index) => (
          <Fragment key={index}>
            {itme.title && <meta property="og:title" content={itme.title} />}
            {itme.description && (
              <meta property="og:description" content={itme.description} />
            )}
            {itme.image && <meta property="og:image" content={itme.image} />}
            {itme.url && <meta property="og:url" content={itme.url} />}
            {itme.type && <meta property="og:type" content={itme.type} />}
          </Fragment>
        ))}

        {twitter.map((itme, index) => (
          <Fragment key={index}>
            {itme.card && <meta name="twitter:card" content={itme.card} />}
            {itme.title && <meta name="twitter:title" content={itme.title} />}
            {itme.description && (
              <meta name="twitter:description" content={itme.description} />
            )}
            {itme.image && <meta name="twitter:image" content={itme.image} />}
            {itme.site && <meta name="twitter:site" content={itme.site} />}
            {itme.creator && (
              <meta name="twitter:creator" content={itme.creator} />
            )}
          </Fragment>
        ))}
      </head>
    </Fragment>
  );
}
