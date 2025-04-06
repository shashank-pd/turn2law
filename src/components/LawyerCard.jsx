export default function LawyerCard({ lawyer, onClick, selected }) {
    return (
        <div
            className={`p-4 border rounded shadow cursor-pointer transition duration-200 ${
                selected ? "bg-blue-100" : "bg-white"
            } hover:bg-gray-100`}
            onClick={onClick}
        >
            <h2 className="text-lg font-semibold">{lawyer.name}</h2>
            <p className="text-sm text-gray-600 capitalize">{lawyer.specialization} Law</p>
            <p className="text-sm">Experience: {lawyer.experience} years</p>
            <p className="text-sm">Rating: ⭐ {lawyer.rating}</p>
        </div>
    );
}
