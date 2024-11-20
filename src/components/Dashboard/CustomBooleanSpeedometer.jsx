import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Card } from "antd";
import { CheckOutlined, CloseOutlined, MinusOutlined, StopOutlined } from "@ant-design/icons";

const CustomBooleanSpeedometer = ({ title, value }) => {
    const isTrue = value === true || value === "true";

    return (
        <Card
            className={`relative shadow-lg rounded-lg`}
        >
            <div className="flex items-center justify-between">
                <Card.Meta
                    title={
                        <span className="text-lg font-bold">
                            {title}
                        </span>
                    }
                />
                <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-error-500`}
                >
                    {isTrue ? (
                        <CheckOutlined className="text-green-500 text-xl" />
                    ) : (
                        <StopOutlined className="text-yellow-500 text-xl" />
                    )}
                </div>
            </div>
            <div className="flex flex-col w-fit mt-6">
                <ReactSpeedometer
                    value={isTrue ? 1 : 0}
                    minValue={0}
                    maxValue={1}
                    segments={2}
                    segmentColors={["#f6961e", "#aee228"]}
                    needleColor="black"
                    width={300}
                    ringWidth={30}
                    labelFontSize="0"
                    valueTextFontSize="0"
                />
            </div>

        </Card>
    );
};

export default CustomBooleanSpeedometer;
