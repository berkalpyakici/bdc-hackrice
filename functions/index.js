// Copyright 2017-2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {
  dialogflow,
  BasicCard,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse,
  Table,
 } = require('actions-on-google');
const functions = require('firebase-functions');

// Constants for list and carousel selection
const SELECTION_KEY_GOOGLE_ASSISTANT = 'googleAssistant';
const SELECTION_KEY_GOOGLE_PAY = 'googlePay';
const SELECTION_KEY_GOOGLE_PIXEL = 'googlePixel';
const SELECTION_KEY_GOOGLE_HOME = 'googleHome';
const APP_STORE_REDIRECT = 'appStore';
const PLAY_STORE_REDIRECT = 'playStore';

// Constant for image URLs
const IMG_URL_AOG = 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png';
const IMG_URL_GOOGLE_PAY = 'https://storage.googleapis.com/actionsresources/logo_pay_64dp.png';
const IMG_URL_GOOGLE_PIXEL = "https://storage.googleapis.com/madebygoog/v1/Pixel/Pixel_ColorPicker/Pixel_Device_Angled_Black-720w.png";
const IMG_URL_GOOGLE_HOME = "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw";

// Constants for selected item responses
const SELECTED_ITEM_RESPONSES = {
  [SELECTION_KEY_GOOGLE_ASSISTANT]: 'You selected Google Assistant!',
  [SELECTION_KEY_GOOGLE_PAY]: 'You selected Google Pay!',
  [SELECTION_KEY_GOOGLE_PIXEL]: 'You selected Google Pixel!',
  [SELECTION_KEY_GOOGLE_HOME]: 'You selected Google Home!',
  [APP_STORE_REDIRECT]: 'Check out bill.com in the App Store!',
  [PLAY_STORE_REDIRECT]: 'Check out bill.com in the PlayStore!',
};

const intentSuggestions = [
  'Org ID',
  'Vendor Invite Status',
  'Recurring Bills',
  'Show me approved bills.'
];

const app = dialogflow({debug: true});

app.middleware((conv) => {
  conv.hasScreen =
    conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
  conv.hasAudioPlayback =
    conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');
  conv.hasWebBrowser =
    conv.surface.capabilities.has('actions.capability.WEB_BROWSER');

  // All require this surface capability check except for media responses
  if (!conv.hasScreen && (conv.intent !== 'media response' || 'media status')) {
    conv.ask(`Hi there! Sorry, I'm afraid you'll have to switch to a ` +
      `screen device or select the phone surface in the simulator.`);
    return;
  }
});

app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new SimpleResponse({
    speech: 'Hi, I am your Bill.com assistant. ' +
      'How can I help you today?',
    text: 'Hi, I am your Bill.com assistant. ' +
      'How can I help you today?',
  }));
  conv.ask(new Suggestions(intentSuggestions));
});

// Show Organization ID
app.intent('bdc organization id', async (conv) => {
    try {
        const response = await require('./BDCInterface/getSessionInfo')();
        conv.ask('Your Bill.com organization ID is ' + response['organizationId'] + '. ');
    } catch (e) {
        console.log(e);
        conv.ask('Something went wrong while accessing to Bill.com services. ');
    }

    conv.ask('Is there anything else I can help you with?');
    conv.ask(new Suggestions(intentSuggestions));
});

// Vendor Invites
app.intent('bdc vendor invites', async (conv) => {
    try {
        const response = await require('./BDCInterface/getVendorIndex').vendorStatus();
        conv.ask(response[0]);
        conv.ask(new Table({
            dividers: true,
            columns: response[1],
            rows: response[2],
        }));
    } catch(e) {
        console.log(e);
        conv.ask('Something went wrong while accessing to Bill.com services. ');
    }

    conv.ask('Is there anything else I can help you with?');
    conv.ask(new Suggestions(intentSuggestions));
  });

//Show upcoming bills
app.intent('bdc get recurring bills', async (conv) => {
  try {
    const response = await require('./BDCInterface/getRecurringBills')();
    if(response.length == 0){
        conv.ask("You do not have any recurring bills");
    }else{
    conv.ask("Here is a list of your upcoming bills.");
    conv.ask(new Table({
      dividers: true,
      columns: ['Vendor', 'Amount', 'Due Date', 'Description'],
      rows: response,
    }));}
  } catch(e) {
    console.log(e);
    conv.ask('Something went wrong while accessing to Bill.com services. ');
  }
  conv.ask("How can I make your day better my guy?");
  conv.ask(new Suggestions(intentSuggestions));
});

//Show bill approval process
app.intent('bdc bills', async (conv, {type}) => {
    try {
        const response = await require('./BDCInterface/getApprovalsList')(type);
        conv.ask(response[0]);
        conv.ask(new Table({
            dividers: true,
            columns: response[1],
            rows: response[2]
        }))
    } catch(e) {
        console.log(e);
        conv.ask('Something went wrong while accessing Bill.com services. ');
    }
    conv.ask('Is there anything else I can help you with?');
});

app.intent('bdc invoices', async (conv, {type}) => {
    try {
        const response = await require('./BDCInterface/getInvoices')(type);
        if (response.length ==0){
          conv.ask("There are no " + type + " invoices");
        }else{
          conv.ask("Here are the " + type + " invoices you have upcoming." )
          conv.ask(new Table({
              dividers: true,
              columns: ["Customer","Status","Amount"],
              rows: response,
          }))
        }
        } catch(e) {
        console.log(e);
        conv.ask('Something went wrong while accessing Bill.com services. ');
        }
        conv.ask('Is there anything else I can help you with?');
});

const appStoreQR = 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=https://apps.apple.com/us/app/bill-com/id980353334';
const playStoreQR = 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=https://play.google.com/store/apps/details?id=com.bdc.bill';

// Carousel
app.intent('Redirect to App', (conv) => {
  conv.ask('Check out our app!');
  conv.ask(new Suggestions(intentSuggestions));
  conv.ask(new Carousel({
    items: {
      // Add the first item to the carousel
      [APP_STORE_REDIRECT]: {
        synonyms: [
          'App Store',
        ],
        title: 'Apple App Store',
        description: 'To pay bills or see more account details on the go, use our app! Scan here for the Apple App Store.',
        image: new Image({
          url: appStoreQR,
          alt: 'App Store QR',
        }),
      },
      // Add the second item to the carousel
      [PLAY_STORE_REDIRECT]: {
        synonyms: [
          'Play Store',
      ],
        title: 'Google Play Store',
        description: 'To pay bills or see more account details on the go, use our app! Scan here for the Google Play Store.',
        image: new Image({
          url: playStoreQR,
          alt: 'Play Store QR',
        }),
      },
    },
  }));
});

// Suggestions
app.intent('suggestions', (conv) => {
  conv.ask('This is an example of suggestion chips.');
  conv.ask(new Suggestions(intentSuggestions));
  conv.ask(new LinkOutSuggestion({
    name: 'Suggestion Link',
    url: 'https://assistant.google.com/',
  }));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
