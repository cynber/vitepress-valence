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


<!-- 
 <template>
  <div id="mc_embed_shell">
    <div id="mailc_embed_signup">
      <form
        :action="actionUrl"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
        @submit.prevent="handleSubmit"
      >
        <div id="mailc_embed_signup_scroll">
          <div class="title">{{ title }}</div>
          <div v-if="description" class="description">
            <p>{{ description }}</p>
          </div>

          <div class="indicates-required">
            <span class="asterisk">*</span> indicates required
          </div>
          <div class="mc-field-group">
            <label for="mce-EMAIL"> Email Address <span class="asterisk">*</span> </label>
            <input
              type="email"
              name="EMAIL"
              class="required email"
              id="mce-EMAIL"
              v-model="email"
              required
            />
          </div>
          <div id="mce-responses" class="clear foot">
            <div class="response" id="mce-error-response" style="display: none"></div>
            <div class="response" id="mce-success-response" style="display: none"></div>
          </div>
          <div aria-hidden="true" style="position: absolute; left: -5000px">
            <input
              type="text"
              :name="hiddenFieldName"
              tabindex="-1"
              v-model="hiddenFieldValue"
            />
          </div>
          <div class="optionalParent">
            <div class="clear foot">
              <button
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                class="button"
              >
                {{ buttonText }}
              </button>
              <p v-if="showReferral && referralLink" class="referral">
                <a
                  :href="referralLink"
                  title="Mailchimp - email marketing made easy and fun"
                >
                  <span class="referral-container">
                    <img
                      class="referral_badge dark-only"
                      src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-light.svg"
                      alt="Intuit Mailchimp"
                    />
                    <img
                      class="referral_badge light-only"
                      src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                      alt="Intuit Mailchimp"
                    />
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailchimpEmbed",
  props: {
    actionUrl: {
      type: String,
      required: true,
    },
    hiddenFieldName: {
      type: String,
      required: true,
    },
    showReferral: {
      type: Boolean,
      default: true,
    },
    referralLink: {
      type: String,
      required: function () {
        return this.showReferral;
      },
    },
    title: {
      type: String,
      default: "Subscribe",
    },
    description: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "Subscribe",
    },
  },
  data() {
    return {
      email: "",
      hiddenFieldValue: "",
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = this.validationScriptUrl;
    script.async = true;
    document.body.appendChild(script);

    // Initialize Mailchimp variables
    window.fnames = [];
    window.ftypes = [];
    window.fnames[0] = "EMAIL";
    window.ftypes[0] = "email";
    window.fnames[1] = "FNAME";
    window.ftypes[1] = "text";
    window.fnames[2] = "LNAME";
    window.ftypes[2] = "text";
    window.fnames[3] = "ADDRESS";
    window.ftypes[3] = "address";
    window.fnames[4] = "PHONE";
    window.ftypes[4] = "phone";
    window.fnames[5] = "BIRTHDAY";
    window.ftypes[5] = "birthday";
    window.fnames[6] = "COMPANY";
    window.ftypes[6] = "text";

    if (window.jQuery) {
      window.$mcj = window.jQuery.noConflict(true);
    }
  },
  methods: {
    handleSubmit() {
      this.$el.querySelector("form").submit();
    },
  },
  computed: {
    validationScriptUrl() {
      return "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    },
  },
};
</script>

<style scoped>
/*
  Modified from 'Mailchimp Form Embed Code - Classic - 12/17/2015 v10.7'
  
    - removed `#mailc_embed_signup` specificity as styles are scoped
    - removed `div` from selectors
    - removed `-webkit-` and `-moz-` prefixes, as `border-radius` is widely supported
    - extracted CSS out of HTML
    - added custom properties for colors
  */

#mailc_embed_signup {
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
  clear: left;
  font: 14px Helvetica, Arial, sans-serif;
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  padding: 40px 20px 30px 40px;
}

#mailc_embed_signup:hover {
  border-color: var(--vp-c-border);
  box-shadow: inset 2px var(--vp-c-border);
}

#mailc_embed_signup.form {
  display: block;
  position: relative;
  text-align: left;
  margin: 20px;
}

#mailc_embed_signup input {
  border: 1px solid var(--vp-c-border);
  border-radius: 3px;
}

/* #mailc_embed_signup input[type="checkbox"] {
    -webkit-appearance: checkbox;
  }
  
  #mailc_embed_signup input[type="radio"] {
    -webkit-appearance: radio;
  } */

#mailc_embed_signup input:focus {
  border-color: var(--vp-c-brand);
}

#mailc_embed_signup .button {
  clear: both;
  background-color: var(--vp-button-brand-bg);
  border: 0 none;
  border-radius: 4px;
  transition: all 0.23s ease-in-out 0s;
  color: var(--vp-button-brand-text);
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  font-weight: normal;
  height: 32px;
  line-height: 32px;
  margin: 0 5px 10px 0;
  padding: 0 22px;
  text-align: center;
  text-decoration: none;
  vertical-align: top;
  white-space: nowrap;
  width: fit-content;
}

#mailc_embed_signup .button:hover {
  background-color: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}

#mailc_embed_signup .small-meta {
  font-size: 11px;
}

#mailc_embed_signup .nowrap {
  white-space: nowrap;
}

#mailc_embed_signup .mc-field-group {
  clear: left;
  position: relative;
  width: 96%;
  padding-bottom: 3%;
  min-height: 50px;
  display: grid;
}

#mailc_embed_signup .size1of2 {
  clear: none;
  /* float: left; */
  display: inline-block;
  width: 46%;
  margin-right: 4%;
}

* html #mailc_embed_signup .size1of2 {
  margin-right: 2%; /* Fix for IE6 double margins. */
}

#mailc_embed_signup .mc-field-group label {
  display: block;
  margin-bottom: 3px;
}

#mailc_embed_signup .mc-field-group input {
  display: block;
  width: 100%;
  padding: 8px 0;
  text-indent: 2%;
}

#mailc_embed_signup .mc-field-group select {
  display: inline-block;
  width: 99%;
  padding: 5px 0;
  margin-bottom: 2px;
}

#mailc_embed_signup .mc-address-fields-group {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 96%;
  gap: 15px;
}

#mailc_embed_signup .mc-sms-phone-group {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 96%;
  gap: 15px;
  padding-top: 5px;
}

.datefield,
.phonefield-us {
  padding: 5px 0;
}

.datefield input,
.phonefield-us input {
  display: inline;
  width: 60px;
  margin: 0 2px;
  letter-spacing: 1px;
  text-align: center;
  padding: 5px 0 2px 0;
}

.phonefield-us .phonearea input,
.phonefield-us .phonedetail1 input {
  width: 40px;
}

.datefield .monthfield input,
.datefield .dayfield input {
  width: 30px;
}

.datefield label,
.phonefield-us label {
  display: none;
}

.indicates-required {
  text-align: right;
  font-size: 11px;
  margin-right: 4%;
  color: var(--vp-c-text-1);
}

.asterisk {
  color: var(--vp-c-red-2);
  font-size: 150%;
  font-weight: normal;
  position: relative;
  top: 5px;
}

.clear {
  clear: both;
}

.foot {
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 96%;
  align-items: center;
}

@media screen and (max-width: 400px) {
  .foot {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    align-items: center;
    justify-items: center;
  }

  #mc-embedded-subscribe {
    margin: 1em 0;
  }

  .referral_badge {
    width: 50%;
  }

  .referral {
    width: 100%;
    text-align: center;
    margin-top: 8em;
  }

  #mailc_embed_signup .mc-field-group {
    width: 100%;
  }

  #mailc_embed_signup .button {
    width: 90% !important;
    margin: 1em auto;
  }
}

.brandingLogo {
  justify-self: right;
}

.mc-field-group.input-group ul {
  margin: 0;
  padding: 5px 0;
  list-style: none;
}

.mc-field-group.input-group ul li {
  display: block;
  padding: 3px 0;
  margin: 0;
}

.mc-field-group.input-group label {
  display: inline;
}

.mc-field-group.input-group input {
  display: inline;
  width: auto;
  border: none;
}

#mce-responses {
  float: left;
  top: -1.4em;
  padding: 0em 0.5em 0em 0.5em;
  overflow: hidden;
  width: 90%;
  margin: 0 5%;
  clear: both;
}

.response {
  margin: 1em 0;
  padding: 1em 0.5em 0.5em 0;
  font-weight: bold;
  float: left;
  top: -1.5em;
  z-index: 1;
  width: 80%;
}

#mce-error-response {
  display: none;
}

#mce-success-response {
  color: var(--vp-c-success-2);
  display: none;
}

label.error {
  display: block;
  float: none;
  width: auto;
  margin-left: 1.05em;
  text-align: left;
  padding: 0.5em 0;
}

.helper_text {
  color: var(--vp-c-text-2);
  margin-top: 2px;
  display: inline-block;
  padding: 3px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 3px;
  font-size: 14px;
  font-weight: normal;
  z-index: 1;
}

#mc-embedded-subscribe {
  clear: both;
  width: auto;
  display: block;
  margin: 1em 0 1em 5%;
}

#num-subscribers {
  font-size: 1.1em;
}

#num-subscribers span {
  padding: 0.5em;
  border: 1px solid var(--vp-c-border);
  margin-right: 0.5em;
  font-weight: bold;
}

#mailc_embed_signup #mc-embedded-subscribe-form div.mce_inline_error {
  display: inline-block;
  margin: 2px 0 1em 0;
  padding: 3px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 3px;
  font-size: 14px;
  font-weight: normal;
  z-index: 1;
  color: var(--vp-c-red-1);
}

#mailc_embed_signup #mc-embedded-subscribe-form input.mce_inline_error {
  border: 2px solid var(--vp-code-line-error-color);
}

/* Custom Styles */
.title {
  font-size: 2em;
  color: var(--vp-c-text-1);
  text-align: center;
  margin-bottom: 10px;
}

.description {
  font-size: 1em;
  color: var(--vp-c-text-1);
  text-align: center;
  margin-bottom: 20px;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.referral {
  text-align: center;
  margin: 0 auto;
}

.referral-container {
  display: inline-block;
  background-color: transparent;
  border-radius: 4px;
}

.referral_badge {
  width: 220px;
  height: 40px;
  display: flex;
  padding: 2px 0;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  transition: opacity 0.25s ease;
}

.referral_badge:hover {
  opacity: 1;
}

html.dark .light-only {
  display: none !important;
}

html:not(.dark) .dark-only {
  display: none !important;
}
</style>

-->