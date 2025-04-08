// export default function LawyerCard({ lawyer, onClick, selected }) {
//     return (
//       <div
//         className={`p-4 border rounded shadow cursor-pointer transition duration-200 ${
//           selected ? "bg-blue-100" : "bg-white"
//         } hover:bg-gray-100 drop-shadow-2xl`}
//         onClick={onClick}
//       >
//         <h2 className="text-lg font-semibold">{lawyer.name}</h2>
//         <p className="text-sm text-gray-600 capitalize">{lawyer.specialization} Law</p>
//         <p className="text-sm">Experience: {lawyer.experience} years</p>
//         <p className="text-sm">Rating: ⭐ {lawyer.rating}</p>
//       </div>
//     );
//   }


import { User, Clock, Star } from 'lucide-react'; // Importing the necessary icons
import { motion } from 'framer-motion';

export default function LawyerCard({ lawyer, onClick, selected }) {
  return (
    <motion.div
      className={`p-4 rounded-lg border shadow cursor-pointer transform transition duration-150 hover:shadow-lg hover:bg-gray-100 
        ${selected 
          ? "bg-blue-200 border-blue-700 border-2" 
          : "bg-white border-gray-300"
        }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-4">
        {/* Lucide icon for the specialization */}
        <User className="text-blue-500" size={24} />

        <div>
          <h2 className="text-lg font-semibold">{lawyer.name}</h2>
          <p className="text-sm text-gray-600 capitalize">{lawyer.specialization} Law</p>
        </div>
      </div>

      {/* Experience Section with Lucide Clock Icon */}
      <div className="flex items-center gap-2 mt-2">
        <Clock className="text-gray-500" size={18} />
        <p className="text-sm"><b>Experience:</b> {lawyer.experience} years</p>
      </div>

      {/* Rating Section with Lucide Star Icon */}
      <div className="flex items-center gap-2 mt-2">
        <Star className="text-yellow-500" size={18} />
        <p className="text-sm"><b>Rating</b>  {lawyer.rating}</p>
      </div>
    </motion.div>
  );
}
