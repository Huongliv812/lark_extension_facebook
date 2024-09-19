// api/addDataToTable.ts
import { bitable, ITextField, INumberField } from "@lark-base-open/js-sdk";

// Define the type of Facebook Ads data
interface IFacebookAdRecord {
  date_start: string;
  account_id: string;
  campaign_id: string;
  campaign_name: string;
  objective: string;
  reach: number;
  impressions: number;
  frequency: number;
  spend: number;
  clicks: number;
  website_ctr: number;
  cpc: number;
  ctr: number;
  cpm: number;
  cpp: number;
  conversions: number;
  conversion_values: number;
  video_thruplay_watched_actions: number;
  actions: number;
  action_values: number;
}

export const addDataToTable = async (tableId: string, fbData: IFacebookAdRecord[]): Promise<string> => {
  try {
    if (!tableId || fbData.length === 0) {
      return 'No data to add';
    }

    const table = await bitable.base.getTableById(tableId);

    // Get the field IDs for each field in the table
    const dateStartField = await table.getField<ITextField>("date_start");
    const accountIdField = await table.getField<ITextField>("account_id");
    const campaignIdField = await table.getField<ITextField>("campaign_id");
    const campaignNameField = await table.getField<ITextField>("campaign_name");
    const objectiveField = await table.getField<ITextField>("objective");
    const reachField = await table.getField<INumberField>("reach");
    const impressionsField = await table.getField<INumberField>("impressions");
    const frequencyField = await table.getField<INumberField>("frequency");
    const spendField = await table.getField<INumberField>("spend");
    const clicksField = await table.getField<INumberField>("clicks");
    const websiteCtrField = await table.getField<INumberField>("website_ctr");
    const cpcField = await table.getField<INumberField>("cpc");
    const ctrField = await table.getField<INumberField>("ctr");
    const cpmField = await table.getField<INumberField>("cpm");
    const cppField = await table.getField<INumberField>("cpp");
    const conversionsField = await table.getField<ITextField>("conversions");
    const conversionValuesField = await table.getField<ITextField>("conversion_values");
    const videoThruplayWatchedActionsField = await table.getField<ITextField>("video_thruplay_watched_actions");
    const actionsField = await table.getField<ITextField>("actions");
    const actionValuesField = await table.getField<ITextField>("action_values");

    // Loop through fbData and add each record to the table
    for (const record of fbData) {
      await table.addRecord({
        fields: {
          [dateStartField.id]: record.date_start.toString(),
          [accountIdField.id]: record.account_id,
          [campaignIdField.id]: record.campaign_id,
          [campaignNameField.id]: record.campaign_name,
          [objectiveField.id]: record.objective,
          [reachField.id]: parseFloat(record.reach.toString()),
          [impressionsField.id]: parseFloat(record.impressions.toString()),
          [frequencyField.id]: parseFloat(record.frequency.toString()),
          [spendField.id]: parseFloat(record.spend.toString()),
          [clicksField.id]: parseFloat(record.clicks.toString()),
          [websiteCtrField.id]: parseFloat(record.website_ctr.toString()),
          [cpcField.id]: parseFloat(record.cpc.toString()),
          [ctrField.id]: parseFloat(record.ctr.toString()),
          [cpmField.id]: parseFloat(record.cpm.toString()),
          [cppField.id]: parseFloat(record.cpp.toString()),
          [conversionsField.id]: record.conversions.toString(),
          [conversionValuesField.id]: record.conversion_values.toString(),
          [videoThruplayWatchedActionsField.id]: record.video_thruplay_watched_actions.toString(),
          [actionsField.id]: record.actions.toString(),
          [actionValuesField.id]: record.action_values.toString()
        }
      });
    }

    return 'Records added successfully!';
  } catch (error) {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    } else {
      return "An unknown error occurred";
    }
  }
};
