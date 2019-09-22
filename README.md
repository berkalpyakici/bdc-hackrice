# Google Actions Conversation for Bill.com 
This repository holds source files for Google Actions project for bill.com, built at HackRice 9 by Berk Alp Yakici, Christine Zhao, Daniel Rothfusz, and Brandon Stanley using Node.JS.

## Dependencies
1.  Install [Node.JS and NPM](https://nodejs.org/).
2.  Install [Firebase CLI](https://developers.google.com/actions/dialogflow/deploy-fulfillment).
    * After installation, login to Firebase with your Google ID by typing `firebase login` in command line.

## Installation
Clone the repository into your desktop:
```bash
git clone https://github.com/berkalpyakici/bdc-hackrice
```

#### Actions Console
1. From the [Actions on Google Console](https://console.actions.google.com/), New project (this will be your *Project ID*) > **Create Project** > under **More options** > **Conversational**
1. From the top menu under **Develop** > **Actions** (left nav) > **Add your first action** > **BUILD** (this will bring you to the Dialogflow console) > Select language and time zone > **CREATE**.
1. In the Dialogflow console, go to **Settings** ⚙ > **Export and Import** > **Restore from zip** using the `bdc-hackrice.zip` in this sample's directory.

#### Firebase Deployment
1. On your local machine, in the `functions` directory, run `npm install`
1. Run `firebase deploy --project {PROJECT_ID}` to deploy the function
    + To find your **Project ID**: In [Dialogflow console](https://console.dialogflow.com/) under **Settings** ⚙ > **General** tab > **Project ID**.

#### Dialogflow Console
1. Return to the [Dialogflow Console](https://console.dialogflow.com) > select **Fulfillment** > **Enable** Webhook > Set **URL** to the **Function URL** that was returned after the deploy command > **SAVE**.
    ```
    Function URL (dialogflowFirebaseFulfillment): https://<REGION>-<PROJECT_ID>.cloudfunctions.net/dialogflowFirebaseFulfillment
    ```
1. From the left navigation menu, click **Integrations** > **Integration Settings** under Google Assistant > Enable **Auto-preview changes** >  **Test** to open the Actions on Google simulator then say or type `Talk to my test app`.

## Commands
This assistant can take many commands, such as:
* What's my organization ID?
* What are my recurrent bills?
* Make a bill.
* Show me approved bills.
* List unapproved bills.
* Give me rejected bills.
* What are all the bills?  
...