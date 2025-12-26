// FILE: src/main/java/com/resumeiq/entity/Template.java
package com.resumeiq.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "templates",
        indexes = {
                @Index(name = "idx_template_ats", columnList = "atsFriendly")
        }
)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 500)
    private String description;

    private String previewImageUrl;

    @Column(nullable = false)
    private boolean atsFriendly;
}
