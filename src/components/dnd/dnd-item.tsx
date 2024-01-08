'use client';

import {
    Draggable,
    DraggableId,
    DraggableProvided,
    DraggableStateSnapshot,
    DraggableStyle,
    DropAnimation
} from "@hello-pangea/dnd";
import {motion} from "framer-motion";
import {MyId} from "@/components/dnd/dnd-list";


export interface DndItemProps<T extends MyId> {
    id: DraggableId;
    isDragDisabled?: boolean;
    position: number;
    item: T;
    renderItem: (item: T, isDragging: boolean) => React.ReactNode;
}

function getStyle(style?: DraggableStyle, snapshot?: DraggableStateSnapshot) {
    if (!snapshot?.isDropAnimating) {
        return style;
    }

    const shadow = (snapshot?.draggingOver === 'list-2') ? '0 0 0.5rem #ff0000' : '0 0 0.5rem #00ff00';

    return {
        ...style,
        shadow,
        // transitionDuration: `0.01s`,
    };
}

export default function DndItem<T extends MyId>(props: DndItemProps<T>) {
    return <Draggable draggableId={props.id} index={props.position} isDragDisabled={props.isDragDisabled}>
        {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
            <div
                className={`mr-2 ${
                    props.isDragDisabled ? 'cursor-default' : 'cursor-grab'
                }`}
                ref={dragProvided.innerRef}
                {...dragProvided.draggableProps}
                {...dragProvided.dragHandleProps}
                style={getStyle(dragProvided.draggableProps.style, dragSnapshot)}
            >
                {props.renderItem(props.item, dragSnapshot.isDragging)}
            </div>
        )}
    </Draggable>;
}