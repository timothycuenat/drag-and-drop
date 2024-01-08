import {useCallback} from "react";
import {DragDropContext, DropResult, ResponderProvided} from "@hello-pangea/dnd";
import MyStore from "@/store/store";

export interface DndContextProps {
    children: React.ReactNode | React.ReactNode[];
}

export default function DndContext(props: DndContextProps) {
    // using useCallback is optional
    const onBeforeCapture = useCallback(() => {
        /*...*/
    }, []);
    const onBeforeDragStart = useCallback(() => {
        /*...*/
    }, []);
    const onDragStart = useCallback(() => {
        /*...*/
    }, []);
    const onDragUpdate = useCallback(() => {
        /*...*/
    }, []);
    const onDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
        const {destination, source, draggableId} = result;
        if (destination) {
            MyStore.getInstance().moveCard(source.droppableId, source.index, destination.droppableId, destination.index);
        }
    }, []);

    return (
        <DragDropContext
            onBeforeCapture={onBeforeCapture}
            onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            {props.children}
        </DragDropContext>
    );
}