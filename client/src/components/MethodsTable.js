const MethodsTable = () => {
  return (
    <main>
      <div className="container">
        <article>
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">not</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>implemented</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="col">#</th>
                <td scope="col">yet</td>
              </tr>
            </tfoot>
          </table>
        </article>
      </div>
    </main>
  );
};
export default MethodsTable;
