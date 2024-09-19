// api/addDataToTable.ts
import { bitable, ITableMeta, ITextField, IRecordField, INumberField } from "@lark-base-open/js-sdk";

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
          [dateStartField.id]: record.date_start,
          [accountIdField.id]: record.account_id,
          [campaignIdField.id]: record.campaign_id,
          [campaignNameField.id]: record.campaign_name,
          [objectiveField.id]: record.objective,
          [reachField.id]: parseFloat(record.reach),
          [impressionsField.id]: parseFloat(record.impressions),
          [frequencyField.id]: parseFloat(record.frequency),
          [spendField.id]: parseFloat(record.spend),
          [clicksField.id]: parseFloat(record.clicks),
          [websiteCtrField.id]: parseFloat(record.website_ctr),
          [cpcField.id]: parseFloat(record.cpc),
          [ctrField.id]: parseFloat(record.ctr),
          [cpmField.id]: parseFloat(record.cpm),
          [cppField.id]: parseFloat(record.cpp),
          [conversionsField.id]: record.conversions,
          [conversionValuesField.id]: record.conversion_values,
          [videoThruplayWatchedActionsField.id]: record.video_thruplay_watched_actions,
          [actionsField.id]: record.actions,
          [actionValuesField.id]: record.action_values
        }
      });
    }

    return 'Records added successfully!';
  } catch (error) {
    throw new Error(`Error adding data to table: ${error.message}`);
  }
};
