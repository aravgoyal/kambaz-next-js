export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
        </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select className="wd-group">
                <option>ASSIGNMENTS</option>
            </select>
        </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select className="wd-display-grade-as">
                <option>Percentage</option>
            </select>
        </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select className="wd-submission-type">
                <option>Online</option>
            </select>
            <p>Online Entry Options</p>
            <input type="checkbox"/> Text Entry
            <input type="checkbox"/> Website URL
            <input type="checkbox"/> Media Recordings
            <input type="checkbox"/> Student Annotation
            <input type="checkbox"/> File Uploads
            <p>Assign Assign to</p>
            <textarea name="assign" id="wd-assign-to">Everyone</textarea>
            <p>Due</p>
            <input type="datetime-local" id="wd-due-date" />
            <p>Available from</p>
            <input type="datetime-local" id="wd-available-from" />
            <p>Until</p>
            <input type="datetime-local" id="wd-available-until" />
        </td>
        </tr>
      </table>
      <button>Cancel</button>
      <button>Save</button>
    </div>
);}
