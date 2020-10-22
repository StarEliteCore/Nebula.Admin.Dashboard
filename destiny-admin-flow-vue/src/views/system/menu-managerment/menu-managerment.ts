export default {
    data() {
      return {
        data2: [
          {
            title: "parent 1",
            expand: true,
            children: [
              {
                title: "parent 1-1",
                expand: true,
                children: [
                  {
                    title: "leaf 1-1-1",
                  },
                  {
                    title: "leaf 1-1-2",
                  },
                ],
              },
              {
                title: "parent 1-2",
                expand: true,
                children: [
                  {
                    title: "leaf 1-2-1",
                  },
                  {
                    title: "leaf 1-2-1",
                  },
                ],
              },
            ],
          },
        ],
        columns4: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                title: 'Name',
                key: 'name'
            },
            {
                title: 'Age',
                key: 'age'
            },
            {
                title: 'Address',
                key: 'address'
            }
        ],
        data1: [
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
                date: '2016-10-01'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }
        ]
      };
    },
  };