---
aside: false

prev:
  text: "Installation & Setup"
  link: "/guide/install"
next: false
---

# Embed Components: Mailchimp Subscribe Form

This components will embed the default Mailchimp signup form, while keeping the layout and design consistent with the rest of your site. Currently, this component supports the `Embedded form` option, with a simple email input and submit button.



## Demo

<VpvEmbedMailchimp
  title="Newsletter"
  description="Want to stay up to date with new blog posts? Sign up to my newsletter below to receive emails when I share something new!"
  :actionUrl="'https://gmail.us10.list-manage.com/subscribe/post?u=d812cf8031f0347333497b1eb&amp;id=5afacc8f7b&amp;f_id=0027dae5f0'"
  :hiddenFieldName="'b_8f82b157356cafd78afb9a994_adca4c029c'"
  :show-referral="true"
  :referralLink="'http://eepurl.com/i6OAK-'"
/>

## Setup

::: warning Do initial installation first

Before you follow any of the guides below, you should [import and install this project](../install.md) in your VitePress site.
:::

1. Log in to your Mailchimp account.
2. Go to the `Audience` tab > `Signup forms` > `Create new form` > `Embedded form`
3. Keep the default settings, continue, and copy the embed code.
4. Hold on to this code, you will need to grab three pieces of information from it:
    - `Action URL`
    - `Hidden Field Name`
    - `Referral Link`

::: details How to find the Action URL

The url will be in a format similar to the following:
- `https://gmail.us10.list-manage.com/subscribe/post?u=SOME_ID`
- `https://github.us16.list-manage.com/subscribe/post?u=SOME_ID`
- etc.

Look for the URL in this part of the embed code:

```html{2}
<div id="mc_embed_signup">
    <form action="https://SOME_URL">        # This is the action URL
    ...
    </form>
</div>
```
:::

::: details How to find the Hidden Field Name

This will be a hidden input field in the form, which is used by Mailchimp to prevent spam. The format will be similar to the following:
- `b_SOME_ID`

Look for the name value in this part of the embed code:

```html{5}
<div style="position: absolute; left: -5000px;" aria-hidden="true">
    /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
    <input 
        type="text" 
        name="b_SOME_ID"                 # This is the hidden field name
        tabindex="-1" 
        value=""
    >
</div>
```
:::

::: details How to find the Referral Link

This is the link that Mailchimp uses to credit your account for new signups (if you enabled this feature). The format will be similar to the following:
- `http://eepurl.com/SOME_ID`

Look for the link in this part of the embed code:

```html{5}
<div class="optionalParent">
    <div class="clear foot">
        <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">
        <p style="margin: 0px auto;">
            <a href="http://eepurl.com/SOME_ID"  # This is the referral link
               title="Mailchimp - email marketing made easy and fun">
                ...
            </a>
        </p>
    </div>
</div>
```
:::

5. Import the component in `docs/.vitepress/theme/index.ts` (or equivalent)

::: code-group
```ts [index.ts]
import { VpvEmbedMailchimp } from '@cynber/vitepress-valence' // [!code ++]

export default {
    enhanceApp({ app, router, siteData }) {
    app.component('VpvEmbedMailchimp', VpvEmbedMailchimp) // [!code ++]
    }
} satisfies Theme
```
:::






## Simple Usage:

```vue
<VpvEmbedMailchimp
  :actionUrl="'https://SOME_URL'"
  :hiddenFieldName="'b_SOME_ID'"
  :show-referral="false"
/>
```

::: details Which will display the following
<VpvEmbedMailchimp
  :actionUrl="'https://SOME_URL'"
  :hiddenFieldName="'b_SOME_ID'"
  :show-referral="false"
/>

Note that this component will be nonfunctional since we used the placeholder values above.
:::

## Optional Functionality

- `title` - The title of the form. (optional, default: "Subscribe")
- `description` - Text to display below the title. (optional, default: *blank*)
- `actionUrl` - The URL to submit the form to. (`required`)
- `hiddenFieldName` - The name of the hidden field in the form. (`required`)
- `referralLink` - The referral link for Mailchimp. (optional, but required if the following prop is true)
- `showReferral` - Whether to show the referral link. (optional, default: true)
- `buttonText` - The text to display on the submit button. (optional, default: "Subscribe")

Here is a silly example using all the props:

```vue
<VpvEmbedMailchimp
  title="Book Club Newsletter"
  description="Want to stay up to date with new book club meetings? Sign up to our newsletter below to receive emails when we share something new!"
  :actionUrl="'https://SOME_URL'"
  :hiddenFieldName="'b_SOME_ID'"
  :show-referral="true"
  :referralLink="'http://eepurl.com/SOME_ID'"
  :buttonText="'Join the Club'"
/>
```

::: details Which will display the following
<VpvEmbedMailchimp
  title="Book Club Newsletter"
  description="Want to stay up to date with new book club meetings? Sign up to our newsletter below to receive emails when we share something new!"
  :actionUrl="'https://SOME_URL'"
  :hiddenFieldName="'b_SOME_ID'"
  :show-referral="true"
  :referralLink="'http://eepurl.com/SOME_ID'"
  :buttonText="'Join the Club'"
/>
:::