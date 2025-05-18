import { Advocate } from "../types/advocate";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

const formatPhoneNumber = (phone: number): string => {
  const str = phone.toString().padStart(10, "0");
  const area = str.slice(0, 3);
  const prefix = str.slice(3, 6);
  const line = str.slice(6);
  return `(${area}) ${prefix}-${line}`;
}

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-neutral-100 text-neutral-700 text-left text-sm font-medium">
          <tr>
            <th className="px-4 py-2 whitespace-nowrap">First Name</th>
            <th className="px-4 py-2 whitespace-nowrap">Last Name</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Degree</th>
            <th className="px-4 py-2">Specialties</th>
            <th className="px-4 py-2 whitespace-nowrap">Years of Experience</th>
            <th className="px-4 py-2 whitespace-nowrap">Phone Number</th>
          </tr>
        </thead>
        <tbody className="text-sm text-neutral-800 divide-y divide-neutral-200">
          {advocates.map((advocate) => (
            <tr key={advocate.phoneNumber} className="even:bg-neutral-50 hover:bg-sky-50 transition-colors">
              <td className="px-4 py-2">{advocate.firstName}</td>
              <td className="px-4 py-2">{advocate.lastName}</td>
              <td className="px-4 py-2">{advocate.city}</td>
              <td className="px-4 py-2">{advocate.degree}</td>
              <td className="px-4 py-2 text-sm text-neutral-700">
                {advocate.specialties.map((specialty, index) => (
                  <span key={index} className="block">{specialty}</span>
                ))}
              </td> 
              <td className="px-4 py-2 text-center">{advocate.yearsOfExperience}</td>
              <td className="px-4 py-2 whitespace-nowrap">{formatPhoneNumber(advocate.phoneNumber)}</td>
            </tr>
          ))}
          {advocates.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-neutral-500">
                No advocates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
