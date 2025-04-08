import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, tagline, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,          
        ease: "easeOut"          
      }}
      viewport={{ once: false, amount: 0.2 }}
      className="group bg-white rounded-2xl border border-gray-200 shadow-md p-6 w-full max-w-[280px] text-center 
                 hover:shadow-xl hover:scale-105 hover:bg-blue-50 transition-all duration-300"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-200 mx-auto mb-4">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 italic mb-3">{tagline}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
