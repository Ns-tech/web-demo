angular.module('app').factory('common', [function ($uibModal) {

    var CommonFactory = {
        //Số bản ghi trên một trạng
        NumPerPage: 10,
        //Hiển thi số trạng
        MaxSize: 5,
        ListStatus: [{ Status: 0, StatusText: "Đang kích hoạt" }, { Status: 1, StatusText: "Đang khóa" }],
        //Đang mở khóa
        UnLock: 0,
        UnLockText: 'Đang kích hoạt',
        //Đang khóa
        Lock: 1,
        LockText: 'Đang khóa',

        //List trạng thái xóa
        ListDeleteFlg: [{ Status: 0, StatusText: "Chưa xóa" }, { Status: 1, StatusText: "Đã xóa" }],
        //Chưa xóa
        DeleteFalse: 0,
        //Đã xóa
        DeleteTrue: 1, 
        //List trạng thái hoạt động Device
        ListStatusActive: [{ Id: 0, Name: "Đang hoạt động" }, { Id: 1, Name: "Bị hỏng" }],
        //Đang hoạt động
        StatusActive: 0,
        //Bị hỏng
        StatusNotActive: 1,
        //Loại vị trí
        ListTypeLocation: [{ Id: 0, Name: "Cố định" }, { Id: 1, Name: "Di động" }],
      
        //Chưa xóa
        NotAuto: 0,
        //Đã xóa
        Auto: 1,
        //
        ListDayOfWeek: [{ Id: 1, Name: "Thứ 2", Select: false }, { Id: 2, Name: "Thứ 3", Select: false }, { Id: 3, Name: "Thứ 4", Select: false },
            { Id: 4, Name: "Thứ 5", Select: false }, { Id: 5, Name: "Thứ 6", Select: false }, { Id: 6, Name: "Thứ 7", Select: false }, { Id: 7, Name: "Chủ nhật", Select: false }],
        Disconnect: 0,
        Connect: 1,
        NoAvatar: "/img/patients/noavatar.gif",
        NoImage: "/img/no-image.png",
        PointCircle: "/img/point-circle.png",
        //Min
        MinSizeIcon: 16,
        //Max
        MaxSizeIcon: 64,
          
        DefaultCity: "01",
        Vip: '1',
        NotVip: '0',
        PatientNew: '0',
        PatientOld: '1',
        ListMonth: [{ Id: 1, Name: "Tháng 1" }, { Id: 2, Name: "Tháng 2" }, { Id: 3, Name: "Tháng 3" }, { Id: 4, Name: "Tháng 4" }, { Id: 5, Name: "Tháng 5" },
            { Id: 6, Name: "Tháng 6" }, { Id: 7, Name: "Tháng 7" }, { Id: 8, Name: "Tháng 8" }, { Id: 9, Name: "Tháng 9" }, { Id: 10, Name: "Tháng 10" },
            { Id: 11, Name: "Tháng 11" }, { Id: 12, Name: "Tháng 12" }],
        ListQuarter: [{ Id: 1, Name: "Quý I" }, { Id: 2, Name: "Quý II" }, { Id: 3, Name: "Quý III" }, { Id: 4, Name: "Quý IV" }],
    };

    return CommonFactory;
}]);