import {CardProps} from "@/components/card/page";

export default class MyStore {
    private static instance: MyStore | null = null;
    private containers: Record<string, Array<CardProps>> = {}; // Use a Record for string keys

    private constructor() {
        // Initialize your singleton instance
    }

    public static getInstance(): MyStore {
        if (MyStore.instance === null) {
            MyStore.instance = new MyStore();
        }
        return MyStore.instance;
    }

    // Add a card to a specific container using a string key
    public addCardToContainer(containerKey: string, card: CardProps): void {
        if (!this.containers[containerKey]) {
            this.containers[containerKey] = []; // Create the container if it doesn't exist
        }
        this.containers[containerKey].push(card);
    }

    // Move a card from a source container to a destination container with specified indices
    public moveCard(
        sourceContainerKey: string,
        sourceIndex: number,
        destinationContainerKey: string,
        destinationIndex: number
    ): void {
        if (
            this.containers[sourceContainerKey] &&
            this.containers[destinationContainerKey] &&
            sourceIndex >= 0 &&
            sourceIndex < this.containers[sourceContainerKey].length &&
            destinationIndex >= 0 &&
            destinationIndex <= this.containers[destinationContainerKey].length
        ) {
            const cardToMove = this.containers[sourceContainerKey][sourceIndex];
            this.containers[sourceContainerKey].splice(sourceIndex, 1); // Remove from the source container
            this.containers[destinationContainerKey].splice(
                destinationIndex,
                0,
                cardToMove
            ); // Insert into the destination container
        } else {
            throw new Error('Invalid source or destination.');
        }
    }


    // Get a specific container by its string key
    public getContainer(containerKey: string): Array<CardProps> | undefined {
        return this.containers[containerKey];
    }

    // Get all containers
    public getAllContainers(): Record<string, Array<CardProps>> {
        return this.containers;
    }
}
