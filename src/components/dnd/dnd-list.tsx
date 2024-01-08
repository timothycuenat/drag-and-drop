import DndItem from "@/components/dnd/dnd-item";
import {
    Direction,
    Droppable,
    DroppableId,
    DroppableProps,
    DroppableProvided,
    DroppableStateSnapshot
} from "@hello-pangea/dnd";

export declare type MyId = { id: string };

export interface DndListProps<T extends MyId> {
    id: DroppableId;
    isDropDisabled?: boolean;
    isDragDisabled?: boolean;
    items: T[] | undefined;
    classNames?: string;
    getClassNames?: (isDraggingOver: boolean) => string;
    renderItem: (item: T, isDragging: boolean) => React.ReactNode;
}

export default function DndList<T extends MyId>(props: DndListProps<T>) {

    const displayItem = (item: T, index: number) => {
        const key = `dnd-item-${item.id}`;
        return (
            <DndItem
                key={key}
                id={key}
                position={index}
                item={item}
                renderItem={props.renderItem}
                isDragDisabled={props.isDragDisabled}
            />
        );
    }


    return (
        <>
            <Droppable
                droppableId={props.id}
                direction={'horizontal'}
                isDropDisabled={props.isDropDisabled}
            >

                {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
                    return (
                        <div
                            className={`dnd-list flex flex-row w-full items-center justify-start rounded-lg p-2 transition-background duration-250 ease-in-out overflow-x-scroll border-2 border-transparent ${
                                props.classNames
                            } ${
                                props.getClassNames ? props.getClassNames(dropSnapshot.isDraggingOver) : ''
                            } ${
                                dropSnapshot.isDraggingOver && !props.isDropDisabled ? 'border-gray-700' : ''
                            } ${
                                props.isDragDisabled ? 'bg-gray-950' : 'bg-gray-900'
                            }`}
                            ref={dropProvided.innerRef}
                            {...dropProvided.droppableProps}
                        >
                            {props.items?.map((item, index) => {
                                return displayItem(item, index);
                            })}
                            {dropProvided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </>
    )
}