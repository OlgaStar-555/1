import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type {TicketProps} from "../paymentTypes.ts";

interface QRCodeDisplayProps {
    tickets: TicketProps[];
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ tickets }) => {

    const qrValue = JSON.stringify(tickets);

    return (
        <div className="qr-code-container">
            <QRCodeSVG value={qrValue} size={200} />
        </div>
    );
};

export default QRCodeDisplay;