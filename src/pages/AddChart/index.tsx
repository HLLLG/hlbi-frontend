import {genChartByAiUsingPost} from '@/services/hlbi/chartController';
import {UploadOutlined,} from '@ant-design/icons';
import React, {useState} from 'react';
import {Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Spin, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import ReactECharts from 'echarts-for-react';

/**
 * 添加图标功能
 * @constructor
 */
const AddChart: React.FC = () => {
  const [chart, setChart] = useState<API.BiResponse>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [option, setOption] = useState<any>();

  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setOption(undefined);
    setChart(undefined);
    const params = {
      ...values,
      file: undefined,
    }
    try {
      const res = await genChartByAiUsingPost(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error("分析失败");
      } else {
        message.success('分析成功');
        console.log(res);
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图标代码解析错误');
        } else {
          setOption(chartOption);
        }
        setChart(res.data);
      }
    } catch (e: any) {
      message.error("分析失败，" + e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
        <Row gutter={24}>
          <Col span={12}>
            <Card title={"智能分析"}>
              <Form name="add-chart" labelAlign={'left'} labelCol={{span: 6}} onFinish={onFinish} initialValues={{}}>
                <Form.Item name="goal" label="分析目标" rules={[{required: true, message: '请输入分析目标'}]}>
                  <TextArea placeholder="请输入你的分析目标， 比如：分析网站用户的增长情况"/>
                </Form.Item>

                <Form.Item name="name" label="图标名称">
                  <Input placeholder="请输入图标名称"/>
                </Form.Item>

                <Form.Item name={"chartType"} label="图表类型">
                  <Select options={[
                    {value: '折线图', label: '折线图'},
                    {value: '柱状图', label: '柱状图'},
                    {value: '堆叠图', label: '堆叠图'},
                    {value: '饼图', label: '饼图'},
                    {value: '雷达图', label: '雷达图'},
                  ]}>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="file"
                  label="原始数据"
                >
                  <Upload name="file" maxCount={1}>
                    <Button icon={<UploadOutlined/>}>上传 CSV 文件</Button>
                  </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{span: 16, offset: 6}}>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                      提交
                    </Button>
                    <Button htmlType="reset">重置</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={"分析结论"}>
              {chart?.genResult ?? <div>请先在左侧进行提交</div>}
              <Spin spinning={submitting}/>
            </Card>
            <Divider/>
            <Card title={"可视化图表"}>
              {
                option ? <ReactECharts option={option}/> : <div>请先在左侧进行提交</div>
              }
              <Spin spinning={submitting}/>
            </Card>
          </Col>
        </Row>
    </div>
  );
};
export default AddChart;
