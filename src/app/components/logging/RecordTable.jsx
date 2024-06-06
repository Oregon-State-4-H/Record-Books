import { MdEdit, MdDelete } from "react-icons/md";
import classes from "./styles.module.css"

function formatValue(value, format) {
  if (!format) return value;

  switch (format) {
    case "date":
      const d = new Date(value);
      const year = d.getUTCFullYear();
      const month = ("0" + (d.getUTCMonth() + 1)).slice(-2);
      const day = ("0" + d.getUTCDate()).slice(-2);
      return `${year}-${month}-${day}`;
    case "currency":
      return `$${value.toFixed(2)}`;
    case "weight":
      return `${value} lbs`;
    default:
      return value;
  }
}

function EditIcon({ onClick }) {
  return (
    <MdEdit onClick={onClick} className={classes.actionIcon} />
  )
}

function DeleteIcon({ onClick }) {
  return (
    <MdDelete onClick={onClick} className={classes.actionIcon} />
  )
}

export default function TableCard({ data, headers, dataLoaded=true, handleEdit, handleDelete}) {
  if ((!data || data.length === 0) && dataLoaded) {
    return (
      <div className={classes.infoSection}>
        <h1 className={classes.infoSectionHeader}>Hmm... your log is empty!</h1>
        <p>{"Let's fix that! Add your first entry above."}</p>
      </div>
    );
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {headers.map((header, headerID) => (
            <th id={headerID} key={headerID}>{header.name}</th>
          ))}

          {(handleEdit || handleDelete) && (
            <th></th>
          )}

        </tr>
      </thead>
      {data && (
        <tbody>
          {data.map((rowData, rowID) => (
            <tr key={rowID}>
              {headers.map((header, colID) => {
                const keys = header.key.split(".");
                let value = rowData;
                for (const key of keys) {
                  value = value[key] ? value[key] : "";
                }
                const formattedValue = formatValue(value, header.format);
                return (
                  <td key={colID}>
                    {Array.isArray(formattedValue) ? (
                      <ul>
                        {formattedValue.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      formattedValue
                    )}
                  </td>
                );
              })}

              {(handleEdit || handleDelete) && (
                <td>
                  <div className={classes.actionCell}>
                    {handleEdit && (<EditIcon onClick={() => handleEdit(rowData._id)} />)}
                    {handleDelete && (<DeleteIcon onClick={() => handleDelete(rowData._id)} />)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}