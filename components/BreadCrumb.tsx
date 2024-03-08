import { useRouter } from "next/navigation";

//Next method of breadCrumb is commented after this BreadCrumb export

interface BreadCrumbType {
  breadCrumbs: {
    label: string;
    path: string;
  }[];
}
const BreadCrumb = ({ breadCrumbs }: BreadCrumbType) => {
  const router = useRouter();
  const handleNavigate = (path: string) => {
    path ? router.push(path) : router.push(String(-1));
  };
  return (
    Array.isArray(breadCrumbs) &&
    breadCrumbs.map((crumb, idx) => {
      const isLastIndex = breadCrumbs.length === idx + 1; //this checks the last index of the array and returns true
      return (
        <div key={idx} className="flex">
          <div
            onClick={() => !isLastIndex && handleNavigate(crumb.path)}
            className={
              isLastIndex
                ? "text-red-500 font-bold mr-10"
                : "text-gray-500 font-normal"
            }
          >
            {crumb.label}
          </div>
          {!isLastIndex && <p className="mr-1">/</p>}
        </div>
      );
    })
  );
};

export default BreadCrumb;

// import Link from "next/link";

// interface BreadCrumbPropsType {
//   breadCrumbs: {
//     label: string;
//     path: string;
//   }[];
// }
// const BreadCrumb = ({ breadCrumbs }: BreadCrumbPropsType) => {
//   return (
//     Array.isArray(breadCrumbs) &&
//     breadCrumbs.map((crumb, idx) => (
//       <div key={crumb.label}>
//         {idx === breadCrumbs.length - 1 ? ( //this checks the last index of the array and returns true
//           <p>{crumb.label}</p>
//         ) : (
//           <Link href={crumb.path}>{crumb.label} /</Link>
//         )}
//       </div>
//     ))
//   );
// };

// export default BreadCrumb;
