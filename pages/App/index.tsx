'use client';
import { bitable, ITableMeta, ITextField } from "@lark-base-open/js-sdk";
import { Button, Form } from '@douyinfe/semi-ui';
import { useState, useEffect, useRef } from 'react';
import HttpService from '../api/fetchFacebookAdsData';
import { addDataToTable } from '../api/addDataToTable';
import Image from 'next/image';
// Nếu thư viện @douyinfe/semi-ui cung cấp kiểu FormApi, hãy import nó
// Nếu không, sử dụng any hoặc tự định nghĩa
// import { FormApi } from '@douyinfe/semi-ui/lib/es/form'; 

export default function App() {
  const [tableMetaList, setTableMetaList] = useState<ITableMeta[]>();
  const formApi = useRef<any>(null); // Sử dụng any nếu không có FormApi
  const [status, setStatus] = useState('');
  const [fbData, setFbData] = useState<any[]>([]);

  const fetchAndAddData = async (values: { access_token: string; account_id: string; table: string }) => {
    try {
      // Fetch data từ Facebook Ads API
      const data = await HttpService.getData(
        `https://graph.facebook.com/v20.0/act_${values.account_id}/insights?` +
        `access_token=${values.access_token}` +
        `&level=campaign&fields=date_start,account_id,campaign_id,campaign_name,adset_name,ad_name,objective,reach,impressions,frequency,spend,clicks,website_ctr,cpc,ctr,cpm,cpp,conversions,conversion_values,video_thruplay_watched_actions,actions,action_values` +
        `&sort=date_start_ascending` +
        `&time_increment=1` +
        `&action_attribution_windows=,` +
        `&limit=1000` +
        `&time_range[since]=2024-09-01` +
        `&time_range[until]=2024-09-04`
      );

      setFbData(data.data); // Lưu dữ liệu Facebook Ads
      setStatus('Data fetched successfully, adding records...');

      // Gọi hàm addDataToTable để thêm records vào Lark Base
      const result = await addDataToTable(values.table, data.data);
      setStatus(result);

    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    bitable.base.getTableMetaList()
      .then(metaList => {
        setTableMetaList(metaList);
      })
      .catch(error => {
        if (error instanceof Error) {
          setStatus(`Error fetching table list: ${error.message}`);
        } else {
          setStatus("Error fetching table list: An unknown error occurred");
        }
      });
  }, []);

  return (
    <main>
      <h4>Fetch Facebook Ads Data and Add to Lark Base</h4>
      <Image
        src="https://substackcdn.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc15a399-a7af-4af8-8438-86d7579d298b_400x400.png"
        alt="Logo"
        width={400}
        height={400}
        className="top-right-image"
      />
      <Form
        labelPosition='top'
        onSubmit={fetchAndAddData}
        getFormApi={(api) => (formApi.current = api)}  // Gán api cho formApi
      >
        <Form.Input field='access_token' label='Access Token' required />
        <Form.Input field='account_id' label='Account ID' required />
        <Form.Select
          field='table'
          label='Select Table'
          placeholder="Please select a Table"
          style={{ width: '100%' }}
        >
          {Array.isArray(tableMetaList) && tableMetaList.map(({ name, id }) => (
            <Form.Select.Option key={id} value={id}>
              {name}
            </Form.Select.Option>
          ))}
        </Form.Select>
        <Button theme='solid' htmlType='submit' className="semi-button">Add Data</Button>
      </Form>

      <p>{status}</p>
    </main>
  );
}
