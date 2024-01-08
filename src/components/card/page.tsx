export type CardProps = {
    title: string;
    id: string;

}

export default function Card({title, id}: CardProps) {
    return (
        <div
            className="myCard flex flex-col items-center justify-center w-24 h-24 p-2 shadow-lg rounded-lg bg-gray-800 cursor-pointer select-none">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-xl text-gray-500">ID #{id}</p>
        </div>
    )
}
