define({ "api": [
  {
    "version": "1.3.0",
    "type": "get",
    "url": "/file/get/:id/[:size]/[:variant]/[:alias]",
    "title": "get",
    "name": "Get",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID oder Dateiname</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "size",
            "defaultValue": "null",
            "description": "<p>Optional: Alias der gewünschten Thumbnail-Größe, muss im PIM-Backend oder als PIM-Standard (&quot;pim_list&quot;, &quot;pim_small&quot;) entsprechend definiert sein</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "variant",
            "defaultValue": "null",
            "description": "<p>Optional: 1x = 1/3 Größe von Originalbild / 2x = 2/3 Größe von Originalbild / 3x = Originalbild</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "alias",
            "defaultValue": "null",
            "description": "<p>Optional: Beliebiger Dateiname für SEO (Die Datei wird lediglich über die ID geladen)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Abfrage anhand ID",
        "content": "/file/get/12",
        "type": "curl"
      },
      {
        "title": "ID und Dateiname",
        "content": "/file/get/12/sample.jpg",
        "type": "curl"
      },
      {
        "title": "Thumbnails anhand ID und Dateiname",
        "content": "/file/get/12/small/sample.jpg",
        "type": "curl"
      },
      {
        "title": "Thumbnails anhand ID, Dateiname und Responsive",
        "content": "/file/get/12/small/3x/sample.jpg (Original-Bild)",
        "type": "curl"
      },
      {
        "title": "Thumbnails anhand ID, Dateiname und Responsive",
        "content": "/file/get/12/small/2x/sample.jpg (2/3 Größe von Original-Bild)",
        "type": "curl"
      },
      {
        "title": "Thumbnails anhand ID, Dateiname und Responsive",
        "content": "/file/get/12/small/1x/sample.jpg (1/3 Größe von Original-Bild)",
        "type": "curl"
      }
    ],
    "description": "<p>Download/Darstellung von Dateien, der Aufruf kann über folgende Kombinationen erfolgen</p> <ul> <li>/file/get/ID</li> <li>/file/get/ID/ALIAS</li> <li>/file/get/ID/SIZE/ALIAS</li> <li>/file/get/ID/SIZE/VARIANT/ALIAS</li> </ul> <p>Der Parameter ALIAS (z.B. beliebiger Dateiname) kann frei für SEO-Zwecke gesetzt werden und hat keinen Einfluss auf die Abfrage des entsprechenden Objektes. Für die Abfrage spielt lediglich die ID eine Rolle.</p>",
    "filename": "source/areanet/PIM/Controller/FileController.php",
    "groupTitle": "File"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/file/upload",
    "title": "upload",
    "name": "Upload",
    "group": "File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Normaler POST-Upload von Dateien</p>",
    "filename": "source/areanet/PIM/Controller/FileController.php",
    "groupTitle": "File"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/api/all",
    "title": "all",
    "name": "All",
    "group": "Objekte",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Gibt alle Objekte aller Entitys zurück</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastModified",
            "defaultValue": "yyyymmdd hh:mm:ii",
            "description": "<p>Es werden nur die Objekte zurückgegeben, die seit lastModified geändert wurden.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "flatten",
            "defaultValue": "false",
            "description": "<p>Gibt bei Joins lediglich die IDs und nicht die kompletten Objekte zurück</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Beispiel:",
          "content": "{\n \"lastModified\": \"2016-02-20 15:30:22\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"allAction\",\n  \"lastModified\": \"2016-02-21 12:20:00\"\n  \"data:\" {\n     \"News\": [\n         {\n             \"id\": 1,\n             \"isHidden\": false,\n             \"isDeleted\": false,\n             \"title\": \"Eine News\"\n         },\n         ...\n     },\n     \"EntityXYZ\": [\n         {...},\n         {...},\n         ...\n     ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Objekte"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/api/tree",
    "title": "tree",
    "name": "Baumansicht",
    "group": "Objekte",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "entity",
            "description": "<p>Auszulesende Entity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Beispiel:",
          "content": "{\n \"entity\": \"Category\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"message\": \"treeAction\",\n    \"data:\" [\n       {\n           \"id\": 1,\n           \"isHidden\": false,\n           \"isDeleted\": false,\n           \"title\": \"Eine Kategorie\",\n           \"treeChilds\" : [\n               {\n                   ....\n               }\n           ]\n       },\n       {...},\n       ...\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Objekte"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/api/delete",
    "title": "delete",
    "name": "Delete",
    "group": "Objekte",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "entity",
            "description": "<p>Zu löschende Entity</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Zu löschende Objekt-ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Beispiel:",
          "content": "{\n \"entity\": \"News\",\n \"id\": 12\n }",
          "type": "json"
        }
      ]
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Objekte"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/api/insert",
    "title": "insert",
    "name": "Insert",
    "group": "Objekte",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Datumsfelder sollten im ISO 8601-Format übertragen werden.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "entity",
            "description": "<p>Einzutragende Entity</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Daten des Objekts, abhhängig von der Entity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Beispiel:",
          "content": "{\n \"entity\": \"News\",\n \"data\": {\n     \"title\": \"Eine neue News\",\n     \"subtitle: \"Untertitel der neuen News\",\n     \"date\": \"2016-02-18 15:30:00\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Ein Objekt mit einem gleichen UNIQUE-INDEX ist bereits vorhanden</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "501",
            "description": "<p>Unbekannter Serverfehler</p>"
          }
        ]
      }
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Objekte"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/api/list",
    "title": "list",
    "name": "List",
    "group": "Objekte",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "entity",
            "description": "<p>Auszulesende Entity</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "properties",
            "description": "<p>Gibt nur die angebenenen Eigenschaften/Felder zurück, ansonsten werden alle Eigenschaften geladen (Performance!)<code>['feld1', 'feld2', ...]</code></p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "order",
            "defaultValue": "{'id': 'DESC'}",
            "description": "<p>Sortierung: <code>{'date': 'ASC/DESC',...}</code></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "groupBy",
            "description": "<p>Gruppierung der Rückgabe nach Eigenschaft</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "where",
            "description": "<p>Bedingung, mehrere Felder werden mit AND verknüpft: <code>{'title': 'test', 'desc': 'foo',...}</code></p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "count",
            "description": "<p>Nur Rückgabe der Anzahl der Objekte</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "currentPage",
            "description": "<p>Aktuelle Seite für Pagination</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "itemsPerPage",
            "defaultValue": "Config::FRONTEND_ITEMS_PER_PAGE",
            "description": "<p>Anzahl Objekte pro Seite bei Pagination</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "flatten",
            "defaultValue": "false",
            "description": "<p>Gibt bei Joins lediglich die IDs und nicht die kompletten Objekte zurück</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastModified",
            "defaultValue": "yyyymmdd hh:mm:ii",
            "description": "<p>Es werden nur die Objekte zurückgegeben, die seit lastModified geändert wurden.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Beispiel mit Where-Abfrage:",
          "content": "{\n \"entity\": \"News\",\n \"currentPage\": 1,\n \"order\": {\n     \"date\": \"DESC\"\n  },\n \"where\": {\n     \"title\": \"foo\",\n     \"isHidden\": false\n },\n \"properties\": [\"id\", \"title\"]",
          "type": "json"
        },
        {
          "title": "Request-Beispiel zuletzt aktualisierte Objekte",
          "content": "{\n \"entity\": \"News\",\n \"lastModified\": \"2016-02-20 15:30:22\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"message\": \"listAction\",\n    \"lastModified\": \"2016-02-21 12:20:00\"\n    \"itemsPerPage\": 15,\n    \"totalItems\": 200,\n    \"data:\" [\n       {\n           \"id\": 1,\n           \"isHidden\": false,\n           \"isDeleted\": false,\n           \"title\": \"Eine News\"\n       },\n       {...},\n       ...\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Keine Einträge vorhanden</p>"
          }
        ]
      }
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Objekte"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/api/single",
    "title": "single",
    "name": "Single",
    "group": "Objekte",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "entity",
            "description": "<p>Auszulesende Entity</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "group",
            "description": "<p>Nur Rückgabe der Anzahl der Objekte</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "order",
            "defaultValue": "{'id': 'DESC'}",
            "description": "<p>Sortierung: <code>{'date': 'ASC/DESC',...}</code></p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "where",
            "description": "<p>Bedingung, mehrere Felder werden mit AND verknüpft: <code>{'title': 'test', 'desc': 'foo',...}</code></p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "currentPage",
            "description": "<p>Aktuelle Seite für Pagination</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "itemsPerPage",
            "defaultValue": "Config::FRONTEND_ITEMS_PER_PAGE",
            "description": "<p>Anzahl Objekte pro Seite bei Pagination</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "flatten",
            "defaultValue": "false",
            "description": "<p>Gibt bei Joins lediglich die IDs und nicht die kompletten Objekte zurück</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Beispiel:",
          "content": "{\n \"entity\": \"News\",\n \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"message\": \"singleAction\",\n    \"data:\" {\n       \"id\": 1,\n       \"isHidden\": false,\n       \"isDeleted\": false,\n       \"title\": \"Eine News\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Objekt nicht gefunden</p>"
          }
        ]
      }
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Objekte"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/api/update",
    "title": "update",
    "name": "Update",
    "group": "Objekte",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Datumsfelder sollten im ISO 8601-Format übertragen werden.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "entity",
            "description": "<p>zu aktualisierende Entity</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Zu löschende Objekt-ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Daten des Objekts, abhhängig von der Entity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Beispiel:",
          "content": "{\n \"entity\": \"News\",\n \"id\": 12,\n \"data\": {\n     \"title\": \"Eine geänderte News\",\n     \"subtitle: \"Untertitel der geänderten News\",\n     \"date\": \"2016-02-18 15:30:00\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>zu aktualisierendes Objekt ist nicht vorhanden</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Ein Objekt mit einem gleichen UNIQUE-INDEX ist bereits vorhanden</p>"
          }
        ]
      }
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Objekte"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/push/settoken",
    "title": "settoken",
    "name": "Schema",
    "group": "Push",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Gibt das Schema aller Entities zurück</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Device-Token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"ios\"",
              "\"android\""
            ],
            "optional": false,
            "field": "platform",
            "description": "<p>Betriebssystem des Gerätes.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Token registriert</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Token bereits vorhanden</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "501",
            "description": "<p>Unbekannter Fehler beim Einfügen des Token</p>"
          }
        ]
      }
    },
    "filename": "source/areanet/PIM/Controller/PushController.php",
    "groupTitle": "Push"
  },
  {
    "version": "1.3.0",
    "type": "get",
    "url": "/api/config",
    "title": "config",
    "name": "Config",
    "group": "Settings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Grundlegende, frei-zugängliche Konfiguration, z.B. für Login-Seite</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"devmode\": false,\n  \"version\": \"1.3.0\"\n  \"data:\" {\n    ...\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Settings"
  },
  {
    "version": "1.3.0",
    "type": "get",
    "url": "/api/schema",
    "title": "schema",
    "name": "Schema",
    "group": "Settings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Gibt das Schema aller Entities zurück</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"devmode\": false,\n  \"version\": \"1.3.0\"\n  \"data:\" {\n    ...\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "source/areanet/PIM/Controller/ApiController.php",
    "groupTitle": "Settings"
  },
  {
    "version": "1.3.0",
    "type": "post",
    "url": "/auth/login",
    "title": "login",
    "name": "Login",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>Benutzername</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Passwort</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Beispiel:",
          "content": "{\n \"alias\": \"admin\",\n \"pass\": \"xyz\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"message\": \"Login successful\",\n    \"token\": \"sdnajn3sdfmkwrk23cskvavdfgq45sdfasgafg\"\n    \"user\": {\n       \"alias\": \"admin\",\n       \"isAdmin\": true\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Ungültiger Benutzername | Der Benutzer ist gesperrt | Benutzername und/oder Passwort fehlerhaft</p>"
          }
        ]
      }
    },
    "filename": "source/areanet/PIM/Controller/AuthController.php",
    "groupTitle": "User"
  },
  {
    "version": "1.3.0",
    "type": "get",
    "url": "/auth/logout",
    "title": "logout",
    "name": "Logout",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Token",
            "description": "<p>Acces-Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "filename": "source/areanet/PIM/Controller/AuthController.php",
    "groupTitle": "User"
  }
] });
