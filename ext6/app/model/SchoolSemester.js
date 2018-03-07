Ext.define('WWS.model.SchoolSemester', {
    extend: 'WWS.model.Base',
    fields: [
        {name: 'id', mapping: 'SchoolSemester.id', type:'int'},
        {name: 'school_year', mapping: 'SchoolSemester.school_year', type:'string'},
        {name: 'semester', mapping: 'SchoolSemester.semester', type:'string'},
        {name: 'part', mapping: 'SchoolSemester.part', type:'string'},
        {name: 'start', mapping: 'SchoolSemester.start', type:'date', dateFormat: 'Y-m-d'},
        {name: 'end', mapping: 'SchoolSemester.end', type:'date', dateFormat: 'Y-m-d'},
        {name: 'name', mapping: 'SchoolSemester.semester', type:'string', convert: function(v, rec) {
            return SchoolFn.buildDisplaySemesterName(rec.raw.SchoolSemester);
        }}
    ]
});