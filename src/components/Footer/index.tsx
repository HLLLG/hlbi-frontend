import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'HLLLG出品';
  const currentYear = new Date().getFullYear();
  const ICP = '粤ICP备2024203558号'
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage} | ${ICP}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/hlllg',
          blankTarget: true,
        },
        {
          key: 'HL智能 BI',
          title: 'HL智能 BI',
          href: 'https://github.com/hlllg',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
