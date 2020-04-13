module.exports.postCreate = function (req, res, next) {
    var errors = [];

    if (!req.body.name) {
        errors.push("Name is required.");
    }

    if (!req.body.phone) {
        errors.push("Phone is required.");
    }

    if (errors.length) {
        res.render("users/create", {
        errors: errors, // Hiển thị lỗi
        values: req.body, // Khi tạo bị lỗi, phần đã nhập vào không bị mất đi
        });
        return; // Nếu có lỗi sẽ dừng tại đây, không chạy dòng 51 và 52
    }

    next();
};
