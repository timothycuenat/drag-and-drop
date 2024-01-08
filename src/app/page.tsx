'use client';

import Image from 'next/image'
import Card, {CardProps} from "@/components/card/page";
import {AnimatePresence} from "framer-motion";
import {useState} from "react";
import DndList from "@/components/dnd/dnd-list";
import DndContext from "@/components/dnd/dnd-context";
import MyStore from "@/store/store";

MyStore.getInstance().addCardToContainer('list-1', {id: '1', title: 'Card 1'});
MyStore.getInstance().addCardToContainer('list-1', {id: '2', title: 'Card 2'});
MyStore.getInstance().addCardToContainer('list-1', {id: '3', title: 'Card 3'});
MyStore.getInstance().addCardToContainer('list-2', {id: '4', title: 'Card 4'});
MyStore.getInstance().addCardToContainer('list-2', {id: '5', title: 'Card 5'});
const list1 = MyStore.getInstance().getContainer('list-1');
const list2 = MyStore.getInstance().getContainer('list-2');

export default function Home() {

    const [dndActivated, setDndActive] = useState(false);

    return (
        <main className="flex min-h-screen flex-col items-start justify-start p-5 gap-5">
            <h1 className="text-5xl text-left font-bold">Drag & Drop</h1>
            <button onClick={() => setDndActive(!dndActivated)}
                    className={`bg-gray-800 text-white px-4 py-2 rounded-lg ${
                        dndActivated ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                {dndActivated ? 'Deactivate' : 'Activate'}
            </button>
            <DndContext>
                <DndList
                    id={'list-1'}
                    isDragDisabled={!dndActivated}
                    items={list1}
                    getClassNames={(isDraggingOver) => isDraggingOver ? 'bg-gray-500' : ''}
                    renderItem={(item: CardProps, isDragging) => (
                        <Card
                            key={item.id}
                            id={item.id}
                            title={item.title}
                        />
                    )}
                /><DndList
                id={'list-2'}
                isDragDisabled={!dndActivated}
                items={list2}
                getClassNames={(isDraggingOver) => isDraggingOver ? 'bg-gray-500' : ''}
                renderItem={(item: CardProps, isDragging) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        title={item.title}
                    />
                )}
            />
            </DndContext>
        </main>
    )
}
