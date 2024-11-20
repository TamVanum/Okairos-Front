import { Card } from "antd";
import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomSpeedometer from "./CustomSpedometer";
import attriburesMap from "../../utils/attributesMap";
import { tailwindColorOptions } from "../../utils/colorOptions";

const DashboardCard = ({colorOption, title, value, minimum, maximum }) => {
    const [isStable, setIsStable] = useState(value >= minimum && value <= maximum);

    // Map the title to a descriptive name from attriburesMap
    const mappedTitle = attriburesMap.get(title) || title;

    return (
        <Card
            className={`size-full relative shadow-lg rounded-lg border-bgContainer2-300`}
        >
            <div className="flex items-center justify-between">
                <Card.Meta
                    title={
                        <span className="text-lg font-bold">
                            {mappedTitle}
                        </span>
                    }
                />
               <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-error-500`}
                >
                    {isStable ? (
                        <CheckOutlined className="text-green-500 text-xl" />
                    ) : (
                        <ExclamationOutlined className="text-yellow-500 text-xl" />
                    )}
                </div>
            </div>
            <CustomSpeedometer value={value} minimum={minimum} maximum={maximum} />

        </Card>
    );
};

export default DashboardCard;
