import React from 'react';
import { Breadcrumb, Button, Card, Layout, Menu, theme, Typography } from 'antd';
import img_landing_1 from '/solarpunk.jpg';
const { Header, Content, Footer } = Layout;

const items = new Array(4).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));

const LandingPage = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <div className='flex xs:flex-col sm:flex-col md:flex-col lg:flex-row'>
                <div className='flex flex-col w-5/12 p-6 border-bgContainer2-400 border-2 rounded-2xl'>
                    <Typography.Title level={2} >Welcome to our page</Typography.Title >
                    <Typography.Text>Here you can find a lot of information about our services</Typography.Text>
                    <Button type='primary' className='mt-4 w-fit'>Learn more</Button>

                </div>
                <div className='flex w-7/12 p-6 bg-warning-400 justify-center items-center text-center'>
                    <img src={img_landing_1} alt="first image" width='60%' className='rounded-2xl' />
                </div>
            </div>
            <div>
                <Typography.Title level={2} className='text-center mt-8'>Our services</Typography.Title>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <Card title='Card 1' bordered={false}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title='Card 2' bordered={false}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title='Card 3' bordered={false}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                
            </div>
        </>
    );
};

export default LandingPage;