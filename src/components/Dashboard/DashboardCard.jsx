import { Card } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { tailwindColorOptions } from "../../utils/colorOptions";

const DashboardCard = ({ colorOption, title, value }) => {
    const [isStable, setIsStable] = useState(true);

    const textColor = "text-white";
    const estableSpanStyle = "text-base text-white";

    return (
        <Card className={`${tailwindColorOptions[colorOption]} size-full relative`}>
            <Card.Meta title={<span className={textColor}>{title}</span>} />
            <p className={textColor}>{value}</p>
            <span className={estableSpanStyle}>
                {isStable ? "estable" : "fuera de rango"}
            </span>
            <div className="absolute bottom-4 right-4 bg-white text-black rounded-full p-2 px-3">
                {isStable ? <CheckOutlined className="text-green-900" /> : <CloseOutlined className="text-red-900" />}
            </div>
        </Card>
    );
};

export default DashboardCard;