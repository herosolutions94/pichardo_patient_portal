import React from "react";
import Head from "next/head";
import { cmsFileUrl } from "../helpers/helpers";

export default function MetaGenerator({ page_title, meta_info = false, site_settings = null, meta_thumb = null }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <>
      {page_title && meta_info !== false && (
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

          <title>{page_title}</title>
          <meta name="title" content={meta_info?.meta_title} />
          <meta name="description" content={meta_info?.meta_description} />
          <meta name="keywords" content={meta_info?.meta_keywords} />

          <meta property="og:type" content={meta_info?.og_type} />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={meta_info?.og_title} />
          <meta property="og:description" content={meta_info?.og_description} />
          <meta property="og:image" content={meta_thumb ? meta_thumb : cmsFileUrl(site_settings?.site_thumb, 'images')} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={meta_info?.og_title} />
          <meta
            property="twitter:description"
            content={meta_info?.og_description}
          />
          <meta
            property="twitter:image"
            content={meta_thumb ? meta_thumb : cmsFileUrl(site_settings?.site_thumb, 'images')}
          />
          {
            site_settings?.site_icon ?
              <link rel="icon" href={cmsFileUrl(site_settings?.site_icon, 'images')} />
              :
              ""
          }
        </Head>
      )}
      {page_title && meta_info === false && (
        <Head>
          <title>{page_title}</title>
          <meta name="title" content={page_title} />
          <meta name="description" content={page_title} />
          <meta name="keywords" content={page_title} />

          <meta property="og:type" content='website' />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={page_title} />
          <meta property="og:description" content={page_title} />
          <meta property="og:image" content={cmsFileUrl(site_settings?.site_thumb, 'images')} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={page_title} />
          <meta
            property="twitter:description"
            content={page_title}
          />
          <meta
            property="twitter:image"
            content={cmsFileUrl(site_settings?.site_thumb, 'images')}
          />
          {
            site_settings?.site_icon ?
              <link rel="icon" href={cmsFileUrl(site_settings?.site_icon, 'images')} />
              :
              ""
          }
        </Head>
      )}
    </>
  );
}