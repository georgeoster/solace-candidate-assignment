import { Advocate } from "../types/advocate";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => (
          <tr key={advocate.phoneNumber}>
            <td>{advocate.firstName}</td>
            <td>{advocate.lastName}</td>
            <td>{advocate.city}</td>
            <td>{advocate.degree}</td>
            <td>
              {advocate.specialties.map((specialty, index) => (
                <div key={index}>{specialty}</div>
              ))}
            </td>
            <td>{advocate.yearsOfExperience}</td>
            <td>{advocate.phoneNumber}</td>
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
  );
}
