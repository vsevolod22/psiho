import { IProfession } from "@/modules/Professions/model/api/getPorfessions";
import { Card, CardContent } from "@/shared/ui/card";
import { adaptProfessionToSpecialty } from "./functions";


export const ProfessionsSkeleton = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative h-80 overflow-hidden rounded-2xl border-4 border-primary/50 shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800">
         
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
          
     
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-primary to-primary/50 z-20 rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.7)]"></div>
          
  
          <div className="absolute top-0 bottom-0 left-0 flex gap-2 items-center">
            {Array(5).fill(0).map((_, index) => (
              <div 
                key={`skeleton-${index}`} 
                className="flex-shrink-0 w-[200px] h-[180px] mx-[1px] flex items-center justify-center"
              >
                <div className="w-full h-full rounded-lg border-2 border-gray-700/50 bg-gray-800 animate-pulse flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 rounded-full bg-gray-700 mb-4 animate-pulse"></div>
                  <div className="w-3/4 h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="px-8 py-6 rounded-full w-48 h-16 bg-gray-800 animate-pulse"></div>
        </div>
      </div>
    );
  };
  
  
export  const TestSkeleton = ({ profession }: { profession: IProfession }) => {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8 border-2 border-primary/20 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <div className={`text-4xl p-3 rounded-full ${adaptProfessionToSpecialty(profession).color} text-white mr-4`}>
                {adaptProfessionToSpecialty(profession).icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profession.name}</h2>
                <p className="text-gray-500">{profession.description}</p>
              </div>
            </div>
            
            <div className="space-y-6">
       
              {Array(3).fill(0).map((_, index) => (
                <div key={`question-skeleton-${index}`} className="animate-pulse">
                  <div className="h-6 bg-gray-300/20 rounded-md w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    {Array(4).fill(0).map((_, optIndex) => (
                      <div key={`option-skeleton-${index}-${optIndex}`} className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-gray-300/20 mr-3"></div>
                        <div className="h-4 bg-gray-300/20 rounded-md w-2/3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-8">
                <div className="w-40 h-12 bg-gray-300/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };