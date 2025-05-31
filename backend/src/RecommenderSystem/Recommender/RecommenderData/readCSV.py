import pandas as pd
import json
import sys
import numpy as np

def convert_numpy_types(obj):
    if isinstance(obj, (np.int64, np.int32)):
        return int(obj)
    elif isinstance(obj, (np.float64, np.float32)):
        return float(obj)
    elif isinstance(obj, np.bool_):
        return bool(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    return obj

def csv_to_json(src_csv, output_json):
    try:
        # CSV-Datei einlesen
        df = pd.read_csv(src_csv, encoding="latin1", sep=";")

        # Ersetze Komma durch Punkt in allen numerischen Spalten
        df = df.map(lambda x: str(x).replace(",", ".") if isinstance(x, str) and "," in x else x)
        df = df.apply(pd.to_numeric, errors="ignore")  # Konvertiere numerische Werte

        # Allgemeine Informationen extrahieren
        general_info_columns = ["title", "author", "paperType", "resultType", "bestValue", "minValue", "maxValue"]
        # Liste für alle Paper
        literature_list = []
        # Gruppieren der Daten nach Paper (z. B. anhand der "title"-Spalte)
        grouped = df.groupby('title')

        for title, group in grouped:
            # Allgemeine Informationen für das aktuelle Paper
            general_info = group.iloc[0][general_info_columns].to_dict()
            # Result-Werte extrahieren
            result_columns = [col for col in group.columns if col not in general_info_columns + ["parameterValue"]]
            result = {col: {} for col in result_columns}

            # Gruppieren nach parameterValue
            for parameter_value, param_group in group.groupby("parameterValue"):
                for column in result_columns:
                    # Werte für die aktuelle parameterValue-Gruppe extrahieren
                    value = param_group.iloc[0][column]
                    if pd.notna(value):  # Nur hinzufügen, wenn der Wert nicht NaN ist
                        result[column][parameter_value] = value

            # JSON-Struktur für das aktuelle Paper erstellen
            literature_list.append({
                **general_info,
                "result": {k: v for k, v in result.items() if v}  # Entferne leere Einträge
            })

        # JSON-Struktur erstellen
        json_data = {
            "literature": literature_list
        }

        # JSON-Datei speichern
        with open(output_json, "w") as json_file:
            json.dump(json_data, json_file, indent=2, default=convert_numpy_types)
        print(f"JSON-Datei erfolgreich erstellt: {output_json}")

    except Exception as e:
        print(f"Fehler: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Verwendung: python script.py <src_csv> <output_json>")
    else:
        src_csv = sys.argv[1]
        output_json = sys.argv[2]
        csv_to_json(src_csv, output_json)