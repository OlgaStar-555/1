import {
    HALL_PLACE_TYPES_ADMIN,
    HALL_PLACE_TYPES_CLIENT,
    type HallPlaceTypesAdmin,
    type HallPlaceTypesClient
} from "../../config/halls.ts";
import {HALL_PLACE_CLASS_NAME} from "../../config/constants.ts";

interface HallPlaceProps {
    row: number;
    col: number;
    status: (keyof typeof HALL_PLACE_TYPES_ADMIN) | (keyof typeof HALL_PLACE_TYPES_CLIENT);
    hall: string[][];
    isAdmin: boolean;
    onPlaceClick: (row: number, col: number) => void;
    isActive?: boolean
}

export default function HallPlace({row, col, hall, status, isAdmin, onPlaceClick, isActive = false}: HallPlaceProps) {

    const title = isAdmin ? status as HallPlaceTypesAdmin : status as HallPlaceTypesClient

    return (
        <button className={`${HALL_PLACE_CLASS_NAME} ${HALL_PLACE_CLASS_NAME}_${hall[row][col]}${isActive ? ' active' : ''}`}
                type="button"
                style={
                    {
                        gridRow: row + 1,
                        gridColumn: col + 1
                    }
                }
                disabled={!isAdmin && title === 'taken'}
                title={title}
                data-type={hall[row][col]}
                onClick={() => {
                    onPlaceClick(row, col)
                }}>
        </button>
    )
}