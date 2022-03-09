import 'package:client/widget/order_dialog/action_row.dart';
import 'package:flutter/material.dart';

class ShoppingConfirmDialog extends StatelessWidget {
  const ShoppingConfirmDialog({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ///
    /// Not COMPLETED
    ///
    /// TODO table sticky header!!
    return SingleChildScrollView(
      child: Dialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
        child: SizedBox(
          width: 900,
          height: 600,
          child: Column(
            
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(25, 20, 0, 0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      '確認訂單',
                      style:  TextStyle(fontSize: 30),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Text(
                      '編號 : 0',
                      style:  TextStyle(fontSize: 20),
                    ),
                     SizedBox(
                      height: 10,
                    ),
                    Text(
                      '金額 : 0',
                      style:  TextStyle( fontSize: 20),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                  ],
                ),
              ),
              Divider(color: Colors.grey, height: 1),
              ShoppingConfirmTable(),
              ActionRow(),
            ],
          ),
        ),
      ),
    );
  }
}

class ShoppingConfirmTable extends StatelessWidget {
  const ShoppingConfirmTable({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 800,
      height: 300,
      child: SingleChildScrollView(
        child: DataTable(
          columnSpacing: 10,
          columns: List<DataColumn>.generate(4, (i) {
            return  DataColumn(
              label: Text(
                '$i',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            );
          }),

          rows: List<DataRow>.generate(20, (i) {
            return const DataRow(
              cells: <DataCell>[
                    DataCell(Text('Sarah')),
                    DataCell(Text('19')),
                    DataCell(Text('Student')),
                    DataCell(Text('Student')),
                  ],
            );
          }),
        ),
      ),
    );
  }
}
